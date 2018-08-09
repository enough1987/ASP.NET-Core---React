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
    public class ItemsControllerTests
    {
        [Fact]
        public async void GetAllReturnsAllItems()
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

        [Theory]
        [InlineData("1")]
        [InlineData("3")]
        [InlineData("4")]
        public async void GetItemReturnsItem(string value)
        {
            // Arrange
            var items = GetTestItems();
            var item = new Item () { Id = value };
            var mock = new Mock<IItemsRepository>();
            mock.Setup(repo=>repo.GetById(value)).Returns( Task.FromResult(item) );
            var controller = new ItemsController(mock.Object);

            // Act
            var actual = await controller.GetItem(value);
            Item result = actual?.Value as Item;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.Equal( item.Name, result.Name );
        }


        [Theory]
        [InlineData("10")]
        [InlineData("30")]
        [InlineData("40")]
        public async void GetItemReturnsNullIfNotFound(string value)
        {
            // Arrange
            var mock = new Mock<IItemsRepository>();
            var controller = new ItemsController(mock.Object);

            // Act
            var actual = await controller.GetItem(value);
            var result = actual?.Value;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.Null( result );
        }

        [Theory]
        [InlineData("Test", 100 )]
        [InlineData("Test2", 1000 )]
        [InlineData("Test3", 588 )]
        [InlineData("", 100 )]
        [InlineData("Test2", -100 )]
        [InlineData( "", -50 )]
        public async void AddReturnsBoolAndAddItemIfValidItem(string name, int price)
        {
            // Arrange
            var items = await GetTestItems();
            var item = new Item() { Name = name, Price = price };
            var mock = new Mock<IItemsRepository>();
            var controller = new ItemsController(mock.Object);

            // Act
            var actual = await controller.Add(item);
            var result = actual?.Value;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.IsType<Boolean>( result );
            mock.Verify( x => x.Add(item));
        }

        [Theory]
        [InlineData("1", "Test", 100 )]
        [InlineData("2", "Test2", 1000 )]
        [InlineData("3", "Test3", 588 )]
        [InlineData("" , "", 100 )]
        [InlineData("", "Test2", -100 )]
        [InlineData("", "", -50 )]
        [InlineData("10", "Test", 100 )]
        [InlineData("20", "Test2", 1000 )]
        [InlineData("30", "Test3", 588 )]
        public async void UpdateReturnsBoolAndAddItemIfValidItem(string id, string name, int price)
        {
            // Arrange
            var items = await GetTestItems();
            var item = new Item() { Id = id, Name = name, Price = price };
            var mock = new Mock<IItemsRepository>();
            var controller = new ItemsController(mock.Object);

            // Act
            var actual = await controller.Update(item);
            var result = actual?.Value;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.IsType<Boolean>( result );
            mock.Verify( x => x.Update(item));
        }

        [Theory]
        [InlineData("1" )]
        [InlineData("2" )]
        [InlineData("20" )]
        [InlineData("30" )]
        public async void DeleteReturnsBoolAndDeleteItemIfItExist(string id)
        {
            // Arrange
            var items = await GetTestItems();
            var mock = new Mock<IItemsRepository>();
            var returnedValue = items.Find(x => x.Id == id) != null
                ? true : false;   
            mock.Setup(repo=>repo.Delete(id)).Returns( Task.FromResult(returnedValue) );
            var controller = new ItemsController(mock.Object);

            // Act
            var actual = await controller.Delete(id);
            var result = actual?.Value;

            // Assert
            Assert.IsType<JsonResult>(actual);
            Assert.IsType<Boolean>( result );
            Assert.Equal( returnedValue, result );
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
