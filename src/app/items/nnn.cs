builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"),
        jwtOptions =>
        {
            jwtOptions.TokenValidationParameters.ValidAudience = $"api://{builder.Configuration["AzureAd:ClientId"]}";
        });