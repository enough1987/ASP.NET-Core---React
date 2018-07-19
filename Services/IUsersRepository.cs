using System;
using System.Threading.Tasks;
using reactredux.Models;

namespace reactredux.Services
{
    public interface IUsersRepository
    {
            Task<User> GetUser(string id);

            Task<User> AddUser(User item);

            //Task<bool> RemoveUser(string id);

            //Task<bool> UpdateUser(User item);
    }
}
