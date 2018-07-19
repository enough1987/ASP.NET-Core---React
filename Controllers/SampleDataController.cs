using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using reactredux.Services;

namespace reactredux.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IItemsRepository _itemsRepository;

        public SampleDataController(IItemsRepository itemsRepository)
        {
            _itemsRepository = itemsRepository;
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> GetItem(string id)
        {
            var item = await _itemsRepository.GetItem(id);

            return Json(item);
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> GetItems()
        {

            var items = await _itemsRepository.GetAllItems();

            return Json(items);
        }
    }
}

