using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using reactredux.Models;
using reactredux;

namespace reactredux.Services
{
	public class UsersRepository : IUsersRepository
    {
        private readonly AppDbContext appDbContext = null;

        public UsersRepository(AppDbContext _appDbContext)
         {
            appDbContext = _appDbContext;
         }

        public async Task<User> GetUser(string id) 
         {
            try
            {
                ObjectId internalId = GetInternalId(id);

                return await appDbContext.Users
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
