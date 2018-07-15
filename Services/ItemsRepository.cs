using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using reactredux.Models;

namespace reactredux.Services
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly ItemContext _context = null;

        public ItemsRepository(IOptions<Setting> setting)
        {
            _context = new ItemContext(setting);
        }

        public async Task<IEnumerable<Item>> GetAllItems()
        {
            try
            {
                return await _context.Items
                        .Find(_ => true)
                        .ToListAsync();
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        // query after Id or InternalId (BSonId value)
        public async Task<Item> GetItem(string id)
        {
            try
            {
                ObjectId internalId = GetInternalId(id);
                return await _context.Items
                                     .Find(item => item.Id == id
                                        || item.InternalId == internalId)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        private ObjectId GetInternalId(string id)
        {
            ObjectId internalId;
            if (!ObjectId.TryParse(id, out internalId))
                internalId = ObjectId.Empty;

            return internalId;
        }

        public async Task AddItem(Item item)
        {
            try
            {
                await _context.Items.InsertOneAsync(item);
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task Initialize()
        {
            await AddItem(new Item
            {
                Id = "1",
                Name = "Good 1",
                Price = 1000
            });
            await AddItem(new Item
            {
                Id = "2",
                Name = "Good 2",
                Price = 777

            });
            await AddItem(new Item
            {
                Id = "3",
                Name = "Good 3",
                Price = 456

            });
            await AddItem(new Item
            {
                Id = "4",
                Name = "Good 4",
                Price = 987

            });
            await AddItem(new Item
            {
                Id = "5",
                Name = "Good 5",
                Price = 235

            });
        }

       
    }
}
