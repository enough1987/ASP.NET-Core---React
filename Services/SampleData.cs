using System.Linq;
using reactredux.Models;
 
namespace reactredux.Services
{
    public class SampleData
    {

        private readonly IItemsRepository _itemsRepository;

        public SampleData(IItemsRepository itemsRepository)
        {
            _itemsRepository = itemsRepository;
        }

        public void Initialize()
        {
            _itemsRepository.AddItem(new Item
            {
                Id = "1",
                Name = "Good 1",
                Price = 1000
            });
            _itemsRepository.AddItem(new Item
            {
                Id = "2",
                Name = "Good 2",
                Price = 777

            });
            _itemsRepository.AddItem(new Item
            {
                Id = "3",
                Name = "Good 3",
                Price = 456

            });
            _itemsRepository.AddItem(new Item
            {
                Id = "4",
                Name = "Good 4",
                Price = 987

            });
            _itemsRepository.AddItem(new Item
            {
                Id = "5",
                Name = "Good 5",
                Price = 235

            });
        }
    }
}