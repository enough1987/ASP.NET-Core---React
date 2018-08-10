using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactredux.Controllers
{
    public class EmailsController : Controller
    {
        public IConfiguration Configuration { get; }

        public EmailsController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        [HttpGet]
        public async Task<JsonResult> SendEmail(string toEmail, string subject, string body)
        {
            try
            {
                var smtpClient = new SmtpClient
                {
                    Host = Configuration["Email:Host"], // set your SMTP server name here
                    Port = Int32.Parse(Configuration["Email:Port"]), // Port 
                    EnableSsl = true,
                    Credentials = new NetworkCredential(Configuration["Email:Email"], Configuration["Email:Password"])
                };

                using (var message = new MailMessage(Configuration["Email:Email"], toEmail)
                {
                    Subject = subject,
                    Body = body
                })
                await smtpClient.SendMailAsync(message);
                return Json(true);
            } 
            catch(Exception e)
            {
                Console.WriteLine(e);
                return Json(false);
            }

        }

    }
}
