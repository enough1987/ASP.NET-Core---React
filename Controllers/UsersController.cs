using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reactredux.Models;
using reactredux.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactredux.Controllers
{
    public class UsersController : Controller
    {
        
        private readonly IUsersRepository usersRepository;

        public UsersController(IUsersRepository _usersRepository)
        {
            usersRepository = _usersRepository;

        }

        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            var users = await usersRepository.GetAll();

            return Json(users);
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(string id)
        {
            var res = await usersRepository.Delete(id);

            return Json(res);
        }

    }
}
