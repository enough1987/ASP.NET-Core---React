using System.Collections.Generic;
using System.Threading.Tasks;
using reactredux.Models;

namespace reactredux.Services
{
    public interface IItemsRepository
    {
        Task<IEnumerable<Item>> GetAllItems();
        Task<Item> GetItem(string id);

        // add new item
        Task AddItem(Item item);

        // remove a single document / note
        //Task<bool> RemoveItem(string id);

        // update just a single item
        //Task<bool> UpdateItem(Item item);
    }
}
