using System;
using Microsoft.Extensions.Options;
using reactredux.Models;
using MongoDB.Driver;

namespace reactredux
{
    public class ItemContext
    {
        private readonly IMongoDatabase _database = null;

        public ItemContext(IOptions<Setting> settings)
        {
            string connectionString = settings.Value.ConnectionString;
            var connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            _database = client.GetDatabase(connection.DatabaseName);

            //var client = new MongoClient(settings.Value.ConnectionString);
            //if (client != null)
            //    _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Item> Items
        {
            get
            {
                return _database.GetCollection<Item>("Items");
            }
        }
    }
}
