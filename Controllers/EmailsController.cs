
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reactredux.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactredux.Controllers
{
    public class EmailsController : Controller
    {
        private readonly IEmailService emailService;

        public EmailsController(IEmailService _emailService)
        {
            emailService = _emailService;
        }
        
        [HttpGet]
        public async Task<Boolean> SendEmail(string toEmail, string subject, string body)
        {
            return await emailService.SendEmail(toEmail, subject, body);

        }

    }
}
