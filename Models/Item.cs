﻿using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reactredux.Models
{
    public class Item
    {

        [BsonId]
        // standard BSonId generated by MongoDb
        public ObjectId InternalId { get; set; }

        public string Id { get; set; }

        [Required(ErrorMessage = "Name is not set")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is not set")]
        public int Price { get; set; }

        public Item () 
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}