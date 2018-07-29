using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace reactredux
{
    public class AuthOptions
    {

        public const string ISSUER = "MyAuthServer"; // издатель токена
        public const string AUDIENCE = "http://localhost:5000/"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 10; // время жизни токена - 10 минут

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }

        public static TokenValidationParameters GetTokenValidationParameters() 
        {
            return new TokenValidationParameters
            {
                // укзывает, будет ли валидироваться издатель при валидации токена
                ValidateIssuer = false,
                // строка, представляющая издателя
                ValidIssuer = ISSUER,

                // будет ли валидироваться потребитель токена
                ValidateAudience = false,
                // установка потребителя токена
                ValidAudience = AUDIENCE,

                // будет ли валидироваться время существования
                ValidateLifetime = false,

                // валидация ключа безопасности
                ValidateIssuerSigningKey = false,
                // установка ключа безопасности
                IssuerSigningKey = GetSymmetricSecurityKey()
            };
        }
    }
}
