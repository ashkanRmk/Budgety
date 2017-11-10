using AutoMapper;
using Budgety_master.Controllers.Resources;
using Budgety_master.Models;

namespace Budgety_master.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain Class to API Resource
            CreateMap<Income, IncomeResource>();
            CreateMap<Expense, ExpenseResource>();

            //API Resource to Domain Class

            
        }
    }
}