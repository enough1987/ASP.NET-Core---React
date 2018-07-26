using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using reactredux.Models;
using reactredux.Services;

namespace reactredux.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IItemsRepository itemsRepository;

        public SampleDataController(IItemsRepository _itemsRepository)
        {
            itemsRepository = _itemsRepository;
        }

        [HttpGet("[action]")]
        public JsonResult GetItem(string id)
        {
            var item = itemsRepository.GetById(id);

            return Json(item);
        }

        [HttpGet("[action]")]
        public JsonResult GetItems()
        {

            var items = itemsRepository.GetAll();

            return Json(items);
        }

        [HttpPost("[action]")]
        public JsonResult Add(Item item)
        {

            var res = itemsRepository.AddItem(item);

            return Json(res);
        }

        [HttpPost("[action]")]
        public JsonResult Update(Item item)
        {

            var res = itemsRepository.UpdateItem(item);

            return Json(res);
        }

        [HttpGet("[action]")]
        public JsonResult Delete(string id)
        {
            
            var res = itemsRepository.DeleteItem(id);

            return Json(res);
        }
    }
}

