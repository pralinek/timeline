using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Logging;

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://login.microsoftonline.com/{tenant_id}/v2.0";
        options.Audience = "api://myhub.azurewebsites.net";

        // Configure logging for authentication events
        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Startup>>();
                logger.LogInformation("Successful authentication for user: {User}", context.Principal.Identity?.Name);
                return Task.CompletedTask;
            },
            OnAuthenticationFailed = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Startup>>();
                logger.LogWarning("Authentication failed: {Exception}", context.Exception.Message);
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Startup>>();
                logger.LogWarning("Authentication challenge triggered. Error: {Error}, Description: {ErrorDescription}", 
                    context.Error, context.ErrorDescription);
                return Task.CompletedTask;
            }
        };
    });