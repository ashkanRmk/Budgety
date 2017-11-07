using Budgety_master.Models;
using Microsoft.EntityFrameworkCore;

namespace Budgety_master.Persistence
{
    public class BudgetyDbContext : DbContext
    {
        public BudgetyDbContext(DbContextOptions<BudgetyDbContext> options)
            : base(options)
        {
        }

        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }
    }
}