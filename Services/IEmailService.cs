using System;
using System.Threading.Tasks;

namespace reactredux.Services
{
    public interface IEmailService
    {

        Task<Boolean> SendEmail(string toEmail, string subject, string body);

    }
}
