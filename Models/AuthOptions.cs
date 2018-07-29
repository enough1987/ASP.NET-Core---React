using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace reactredux
{
    public class AuthOptions
    {
        public const bool VALIDATE_ISSUER = true;
        public const bool VALIDATE_AUDIENCE = true;
        public const bool VALIDATE_LIFE_TIME = true;
        public const bool VALIDATE_ISSUER_SIGNING_KEY = true;

        public const string ISSUER = "MyAuthServer"; // издатель токена
        public const string AUDIENCE = "http://localhost:5001/"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 10; // время жизни токена - 10 минут

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }

        public static TokenValidationParameters GetTokenValidationParameters() 
        {
            return new TokenValidationParameters
            {
                // укзывает, будет ли валидироваться издатель при валидации токена
                ValidateIssuer = AuthOptions.VALIDATE_ISSUER,
                // строка, представляющая издателя
                ValidIssuer = AuthOptions.ISSUER,

                // будет ли валидироваться потребитель токена
                ValidateAudience = AuthOptions.VALIDATE_AUDIENCE,
                // установка потребителя токена
                ValidAudience = AuthOptions.AUDIENCE,
                // будет ли валидироваться время существования
                ValidateLifetime = AuthOptions.VALIDATE_LIFE_TIME,

                // установка ключа безопасности
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                // валидация ключа безопасности
                ValidateIssuerSigningKey = AuthOptions.VALIDATE_ISSUER_SIGNING_KEY,
            };
        }
    }
}
