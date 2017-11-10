using System;

namespace Budgety_master.Controllers.Resources
{
    public class ExpenseResource
    {
        public int Id { get; set; }

        public string Caption { get; set; }

        public int UserId { get; set; }

        public double Amount { get; set; }
        
        public DateTime DateAdded { get; set; }
    }
}