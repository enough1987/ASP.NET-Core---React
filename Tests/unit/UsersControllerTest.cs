using Microsoft.AspNetCore.Mvc;
using reactredux.Controllers;
using reactredux.Models;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using reactredux.Services;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;

namespace reactredux.Tests.Unit
{
    public class UsersControllerTests
    {
        [Fact]
        public async void GetAllReturnsAllUsers()
        {
            // Arrange
            var users = GetTestUsers();
            var mock = new Mock<IUsersRepository>();
            mock.Setup(repo=>repo.GetAll()).Returns( users );
            var controller = new UsersController(mock.Object);

            // Act
            var actual = await controller.GetAll();
            List<User> result = actual?.Value as List<User>;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.Equal( (await users).Count, result.Count() );
        }

        [Theory]
        [InlineData("1" )]
        [InlineData("2" )]
        [InlineData("20" )]
        [InlineData("30" )]
        public async void DeleteReturnsBoolAndDeleteUserIfItExist(string id)
        {
            // Arrange
            var users = await GetTestUsers();
            var mock = new Mock<IUsersRepository>();
            var returnedValue = users.Find(x => x.Id == id) != null
                ? true : false;   
            mock.Setup(repo=>repo.Delete(id)).Returns( Task.FromResult(returnedValue) );
            var controller = new UsersController(mock.Object);

            // Act
            var actual = await controller.Delete(id);
            var result = actual?.Value;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.IsType<Boolean>( result );
            Assert.Equal( returnedValue, result );
        }

        private Task<List<User>> GetTestUsers()
        {
            var users = new List<User>
            {
                new User { Id="1", Username="iPhone 7", Email="test@gmail.com" },
                new User { Id="2", Username="Meizu 6 Pro", Email="test@gmail.com" },
                new User { Id="3", Username="Mi 5S", Email="test@gmail.com" },
                new User { Id="4", Username="iPhone 7", Email="test@gmail.com" }
            };
            return Task.FromResult(users);
        }
    }
}
