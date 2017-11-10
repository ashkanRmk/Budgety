using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budgety_master.Controllers.Resources;
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
        private readonly IMapper mapper;
        public IncomesController(BudgetyDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<IncomeResource>> GetIncomes()
        {
            var income = await context.Incomes.ToListAsync();

            return mapper.Map<List<Income>, List<IncomeResource>>(income);
        }
    }
}