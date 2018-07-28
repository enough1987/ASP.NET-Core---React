using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using reactredux.Models;
using reactredux.Services;

namespace reactredux.Controllers
{
    public class ItemsController : Controller
    {
        private readonly IItemsRepository itemsRepository;

        public ItemsController(IItemsRepository _itemsRepository)
        {
            itemsRepository = _itemsRepository;
        }

        [HttpGet]
        public JsonResult GetItem(string id)
        {
            var item = itemsRepository.GetById(id);

            return Json(item);
        }

        [HttpGet]
        public JsonResult GetAll()
        {

            var items = itemsRepository.GetAll();

            return Json(items);
        }

        [HttpPost]
        public JsonResult Add(Item item)
        {

            var res = itemsRepository.AddItem(item);

            return Json(res);
        }

        [HttpPost]
        public JsonResult Update(Item item)
        {

            var res = itemsRepository.UpdateItem(item);

            return Json(res);
        }

        [HttpGet]
        public JsonResult Delete(string id)
        {
            
            var res = itemsRepository.DeleteItem(id);

            return Json(res);
        }
    }
}

