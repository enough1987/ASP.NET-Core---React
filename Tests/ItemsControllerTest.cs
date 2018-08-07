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

namespace reactredux.Tests
{
    public class ItemsControllerTests
    {
        [Fact]
        public async void GetAllReturnsAllItemsreturnAllItems()
        {
            // Arrange
            var items = GetTestItems();
            var mock = new Mock<IItemsRepository>();
            mock.Setup(repo=>repo.GetAll()).Returns( items );
            var controller = new ItemsController(mock.Object);

            // Act
            var actual = await controller.GetAll();
            List<Item> result = actual?.Value as List<Item>;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.Equal( (await items).Count, result.Count() );
        }
        private Task<List<Item>> GetTestItems()
        {
            var items = new List<Item>
            {
                new Item { Id="1", Name="iPhone 7", Price=900},
                new Item { Id="2", Name="Meizu 6 Pro", Price=300},
                new Item { Id="3", Name="Mi 5S", Price=400},
                new Item { Id="4", Name="iPhone 7", Price=900}
            };
            return Task.FromResult(items);
        }
    }
}
