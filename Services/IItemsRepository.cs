using System.Collections.Generic;
using System.Threading.Tasks;
using reactredux.Models;

namespace reactredux.Services
{
    public interface IItemsRepository
    {
        Task<List<Item>> GetAll();

        Task<Item> GetById(string id);

        // add new item
        Task<bool> Add(Item item);

        // update just a single item
        Task<bool> Update(Item item);

        // remove a single document / note
        Task<bool> Delete(string id);
    }
}
