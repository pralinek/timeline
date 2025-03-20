builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Explicitly configure token validation
builder.Services.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.TokenValidationParameters.ValidAudience = $"api://{builder.Configuration["AzureAd:ClientId"]}";
    options.TokenValidationParameters.ValidateIssuerSigningKey = true;  // Ensure key validation
    options.TokenValidationParameters.RequireSignedTokens = true;       // Require signed tokens
});
