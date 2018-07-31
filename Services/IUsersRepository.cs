using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using reactredux.Models;

namespace reactredux.Services
{
    public interface IUsersRepository
    {
        Task<List<User>> GetAll();

        Task<User> GetById(string id);

        // add new item
        Task<bool> Add(User item);

        // update just a single item
        Task<bool> Update(User item);

        // remove a single document / note
        Task<bool> Delete(string id);
    }
}
