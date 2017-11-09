using System;
using System.ComponentModel.DataAnnotations;

namespace Budgety_master.Models
{
    public class Income
    {
        
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Caption { get; set; }

        public int UserId { get; set; }

        public double Amount { get; set; }
        
        public DateTime DateAdded { get; set; }
    }
}