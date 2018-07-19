using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactredux.Controllers
{
    public class AdminController : Controller
    {


        [Authorize(Roles = "admin")]
        [HttpPost]
        public JsonResult IsAdmin()
        {
            return Json(new
            {
                Role = "Admin"
            });
        }
    }
}
