using System.Collections.Generic;
using System.Threading.Tasks;
using Budgety_master.Models;
using Budgety_master.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Budgety_master.Controllers
{
    [Route("/api/incomes")]
    public class IncomesController : Controller
    {
        private readonly BudgetyDbContext context;
        public IncomesController(BudgetyDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Income>> GetIncomes()
        {
            return await context.Incomes.ToListAsync();
        }
    }
}