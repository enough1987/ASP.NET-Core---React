using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using reactredux.Models;

namespace reactredux.Services
{
	public class UsersRepository : IUsersRepository
    {
            private readonly DBContext _context = null;

         public UsersRepository(IOptions<Setting> setting)
         {
                _context = new DBContext(setting);
         }

        public async Task<User> GetUser(string id) 
         {
            try
            {
                ObjectId internalId = GetInternalId(id);

                return await _context.Users
                     .Find(user => user.Id == id
                    || user.InternalId == internalId)
                .FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
         }


            private ObjectId GetInternalId(string id)
            {
                ObjectId internalId;
                if (!ObjectId.TryParse(id, out internalId))
                    internalId = ObjectId.Empty;
            
                return internalId;
            }

        public async Task<User> AddUser(User user)
        {
            await Task.Delay(0);

            return user;
        }
    }
}
