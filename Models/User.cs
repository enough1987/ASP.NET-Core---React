﻿using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reactredux.Models
{
    public class User
    {
            [BsonId]
            // standard BSonId generated by MongoDb
            public ObjectId InternalId { get; set; } 

            public string Id { get; set; }

            [Required(ErrorMessage = "Username is not set")]
            public string Username { get; set; }

            [Required(ErrorMessage = "Email is not set")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Password is not set")]
            public string Password { get; set; }

            public string Role { get; set; }

        public User()
        {
            Id = Guid.NewGuid().ToString();
            Role = "User";
        }
    }
}
