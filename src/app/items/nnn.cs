using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure logging (optional: Use Serilog for better logging)
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/msal.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog(); // Attach Serilog to the app

// Configure MSAL logging
builder.Services.AddSingleton<ILoggerFactory>(sp =>
{
    var loggerFactory = LoggerFactory.Create(logging =>
    {
        logging.AddConsole();
        logging.AddDebug();
    });

    var logger = loggerFactory.CreateLogger("MSAL");

    return loggerFactory;
});

// Configure Authentication using Microsoft.Identity.Web
builder.Services.AddAuthentication()
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Configure MSAL Logging in authentication
builder.Services.Configure<MicrosoftIdentityOptions>(options =>
{
    options.Events = new MicrosoftIdentityWebChallengeUserExceptionHandler
    {
        OnAuthenticationFailed = context =>
        {
            var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogError("Authentication failed: {Error}", context.Exception.Message);
            return Task.CompletedTask;
        }
    };
});

// 🔥 Add MSAL logging to PublicClientApplication
var pca = PublicClientApplicationBuilder.Create(builder.Configuration["AzureAd:ClientId"])
    .WithAuthority($"https://login.microsoftonline.com/{builder.Configuration["AzureAd:TenantId"]}")
    .WithLogging((level, message, containsPii) =>
    {
        if (containsPii) return; // Avoid logging sensitive data
        var logger = builder.Services.BuildServiceProvider().GetRequiredService<ILogger<Program>>();
        logger.Log((LogLevel)level, message);
    }, LogLevel.Verbose, enablePiiLogging: false, enableDefaultPlatformLogging: true)
    .Build();

// Register MSAL client application for Dependency Injection
builder.Services.AddSingleton<IPublicClientApplication>(pca);

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
