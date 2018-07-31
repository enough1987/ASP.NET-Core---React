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
using reactredux.Services;

namespace reactredux.Controllers
{
    public class AuthenticateController : Controller
    {
        public IConfiguration Configuration { get; }
        private readonly IUsersRepository usersRepository;

        public AuthenticateController (IConfiguration configuration, IUsersRepository _usersRepository)
        {
            Configuration = configuration;
            usersRepository = _usersRepository;


        }

        [HttpPost]
        public Task Login () {
            var email = Request.Form["email"];
            var password = Request.Form["password"];

            return Token(email, password);
        }

        [HttpPost]
        public Task Register()
        {
            var username = Request.Form["username"];
            var email = Request.Form["email"];
            var password = Request.Form["password"];

            User user = new User
            {
                Username = username,
                Email = email,
                Password = password
            };

            usersRepository.Add(user);

            return Token(email, password);
        }

        [HttpGet]
        public async Task<List<User>> GetAllUsers () 
        {
            var users = await usersRepository.GetAll();

            return users;
        }

        private async Task Token(string email, string password)
        {

            var identity = await GetIdentity(email, password);
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

        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            var users = await usersRepository.GetAll();

			User user = users.FirstOrDefault(x => x.Email == email && x.Password == password);
            if (user != null)
            {

                var claims = new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("roles", user.Role)
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
