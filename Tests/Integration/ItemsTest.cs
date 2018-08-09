using System;
using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;
using System.Diagnostics.Contracts;
using Microsoft.AspNetCore.Http;

namespace reactredux.Tests.Integration
{
    public class ItemsTest : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private HttpClient _client;

        public ItemsTest(WebApplicationFactory<Startup> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.UseSolutionRelativeContentRoot("/");
            });

            var clientOptions = new WebApplicationFactoryClientOptions();
            clientOptions.AllowAutoRedirect = true;
            clientOptions.BaseAddress = new Uri("http://localhost");
            clientOptions.HandleCookies = true;
            clientOptions.MaxAutomaticRedirections = 7;

            _client = _factory.CreateClient(clientOptions);
        }



        [Theory]
        [InlineData("/api/Items/GetAll")]
        public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
        {
            // Act
            var response = await _client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("text/html; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }
    }
}
