using System.Collections.Generic;
using System.Threading.Tasks;
using reactredux.Models;

namespace reactredux.Services
{
    public interface IItemsRepository
    {
        IEnumerable<Item> GetAll();

        Item GetById(string id);

        // add new item
        Task<bool> AddItem(Item item);

        // update just a single item
        Task<bool> UpdateItem(Item item);

        // remove a single document / note
        Task<bool> DeleteItem(string id);
    }
}
