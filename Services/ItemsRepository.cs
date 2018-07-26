using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using reactredux.Models;

namespace reactredux.Services
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly AppDbContext appDBContext = null;

        public ItemsRepository(AppDbContext _appDbContext)
        {
            appDBContext = _appDbContext;
        }

        public IEnumerable<Item> GetAll()
        {
            return appDBContext.Items
                               .Find(m => true)
                               .ToList();
        }

        // query after Id or InternalId (BSonId value)
        public Item GetById(string id)
        {
            return appDBContext.Items
                               .Find(m => m.Id == id)
                               .FirstOrDefault();
        }

        public Task<bool> AddItem(Item item)
        {
            var result = appDBContext.Items
                               .InsertOneAsync(item);
            
            return Task.FromResult(true);
        }

        public Task<bool> UpdateItem(Item item)
        {
          
            //Build the where condition  
            var filter = Builders<Item>.Filter.Eq("Id", item.Id);  
            //Build the update statement   
            var updatestatement = Builders<Item>.Update.Set("Id", item.Id)
                                                .Set("Name", item.Name)
                                                .Set("Price", item.Price);  
            //fetch the details from CustomerDB based on id and pass into view  
            var result = appDBContext.Items.UpdateOne(filter, updatestatement);

            if (result.IsAcknowledged == false)  
            {  
                return Task.FromResult(false);  
            }
            return Task.FromResult(true);
        }

        public Task<bool> DeleteItem(string id)
        {
 
            //Delete the customer record  
            var result = appDBContext.Items.DeleteOne<Item>(item => item.Id == id); 

            if (result.IsAcknowledged == false)  
            {  
                return Task.FromResult(false);
            }
            return Task.FromResult(true); 
        }
    }
}

