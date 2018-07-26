
using System;
using Microsoft.AspNetCore.Mvc;
using reactredux.Models;
using reactredux.Services;

namespace reactredux1.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IItemsRepository _itemsRepository;

        public SampleDataController(IItemsRepository itemsRepository)
        {
            _itemsRepository = itemsRepository;

            //_itemsRepository.Initialize();
        }

        [HttpGet("[action]")]
        public JsonResult GetItem(int id)
        {
            //var item = db.Items.TakeWhile(_item => _item.Id == id);
            return Json(new Item());
        }

        [HttpGet("[action]")]
        public JsonResult GetItems(int index)
        {
            var items = _itemsRepository.GetAll();
            Console.WriteLine(" +==> ");
            Console.WriteLine(items);

            return Json(new Item());
        }
    }
}

