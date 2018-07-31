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
        private readonly AppDbContext appDBContext = null;

        public UsersRepository(AppDbContext _appDbContext)
        {
            appDBContext = _appDbContext;
        }


        public Task<List<User>> GetAll()
        {
            var users = appDBContext.Users
                               .Find(m => true)
                               .ToList();

            return Task.FromResult(users);
        }

        // query after Id or InternalId (BSonId value)
        public Task<User> GetById(string id)
        {
            var user = appDBContext.Users
                               .Find(m => m.Id == id)
                               .FirstOrDefault();

            return Task.FromResult(user);
        }

        public async Task<bool> Add(User user)
        {
            await appDBContext.Users
                               .InsertOneAsync(user);

            return true;
        }

        public Task<bool> Update(User user)
        {

            //Build the where condition  
            var filter = Builders<User>.Filter.Eq("Id", user.Id);
            //Build the update statement   
            var updatestatement = Builders<User>.Update.Set("Id", user.Id)
                                                .Set("Username", user.Username)
                                                .Set("Email", user.Email)
                                                .Set("Password", user.Password)
                                                .Set("Role", user.Role);
            //fetch the details from CustomerDB based on id and pass into view  
            var result = appDBContext.Users.UpdateOne(filter, updatestatement);

            if (result.IsAcknowledged == false)
            {
                return Task.FromResult(false);
            }
            return Task.FromResult(true);
        }

        public Task<bool> Delete(string id)
        {

            //Delete the customer record  
            var result = appDBContext.Users.DeleteOne<User>(user => user.Id == id);

            if (result.IsAcknowledged == false)
            {
                return Task.FromResult(false);
            }
            return Task.FromResult(true);
        }

    }
}
