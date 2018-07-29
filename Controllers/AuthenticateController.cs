using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;
using System.Security.Claims;
using reactredux.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace reactredux.Controllers
{
    public class AuthenticateController : Controller
    {
        private List<User> users = new List<User>
        {
            new User {Email="admin@gmail.com", Password="12345", Role = "admin" },
            new User { Email="qwerty@gmail.com", Password="55555", Role = "user" }
        };

        public IConfiguration Configuration { get; }

        public AuthenticateController (IConfiguration configuration) 
        {
            Configuration = configuration;
        }

        [HttpPost]
        public async Task Token()
        {
            var email = Request.Form["email"];
            var password = Request.Form["password"];

            var identity = GetIdentity(email, password);
            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid email or password.");
                return;
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Security:Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    Configuration["Security:Tokens:Issuer"],
                    Configuration["Security:Tokens:Audience"],
                    identity.Claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: creds
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                email = identity.Name
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            Response.Headers.Add("JwtToken", encodedJwt);
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }            

        private ClaimsIdentity GetIdentity(string email, string password)
        {
			User user = users.FirstOrDefault(x => x.Email == email && x.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("Role", user.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
