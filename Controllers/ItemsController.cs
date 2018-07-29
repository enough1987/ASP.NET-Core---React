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
        public async Task<JsonResult> GetItem(string id)
        {
            var item = await itemsRepository.GetById(id);

            return Json(item);
        }

        [HttpGet]
        public async Task<JsonResult> GetAll()
        {

            var items = await itemsRepository.GetAll();

            return Json(items);
        }

        [HttpPost]
        public async Task<JsonResult> Add(Item item)
        {
            
            var res = await itemsRepository.Add(item);

            return Json(res);
        }

        [HttpPost]
        public async Task<JsonResult> Update(Item item)
        {

            var res = await itemsRepository.Update(item);

            return Json(res);
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(string id)
        {
            
            var res = await itemsRepository.Delete(id);

            return Json(res);
        }
    }
}

