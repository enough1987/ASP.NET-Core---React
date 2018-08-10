using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace reactredux.Services
{
    public class EmailService : IEmailService
    {
        public IConfiguration Configuration { get; }

        public EmailService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<Boolean> SendEmail(string toEmail, string subject, string body)
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
                return await Task.FromResult(true);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return await Task.FromResult(false);;
            }

        }
    }
}
