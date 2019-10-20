using System.Collections.Generic;
using System.Linq;
using factoryApi.Exceptions;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Models.Plan;
using productionApi.Models.Product;

namespace productionApi.Repositories
{
    public class PlanRepository: IBaseRepository<CreatePlanDto, PlanDto, Plan>
    {
        private readonly MasterProductionContext _context;

        public PlanRepository(MasterProductionContext context)
        {
            _context = context;
        }

        public PlanDto GetById(long id)
        {
            var plan = _context.Plans.ToList().FirstOrDefault(x => x.PlanId == id);
            if (plan == null)
            {
                throw new ObjectNotFoundException("Plan not found with the id:  " + id + "!");
            }
                
            return plan?.toDto();
        }
            
        public IEnumerable<PlanDto> GetAll()
        {
            IEnumerable<Plan> plans = GetAllPlans();
            var planDtos = new List<PlanDto>();

            foreach (var plan in plans)
            {
                planDtos.Add(plan.toDto());
            }

            return planDtos;
        }
        
        private IEnumerable<Plan> GetAllPlans()
        {
            return _context.Plans.ToList();
        }
            
        public Plan Add(CreatePlanDto planDto)
        {
            Plan op = PlanFactory
                .Create(planDto.Operations);
                
            var result = _context.Add(op).Entity;
            _context.SaveChanges();

            return result;
        }

        public PlanDto UpdateElement(long id, CreatePlanDto planDto)
        {
            Plan op = GetPlanById(id);
            if (op == null)
            {
                throw new ObjectNotFoundException("Plan not found with the id:  " + id + "!");
            }
            _context.Update(op);
            _context.SaveChanges();
            return GetById(id);
        }

        public PlanDto DeleteElement(long id)
        {
            var planToDelete = GetPlanById(id);
            if (planToDelete == null)
            {
                throw new ObjectNotFoundException("Plan not found with the id:  " + id + "!");
            }
            _context.Remove(planToDelete);
            _context.SaveChanges();
                
            return planToDelete.toDto();
        }
        
        private Plan GetPlanById(long id)
        {
            return _context.Plans.ToList().FirstOrDefault(x => x.PlanId == id);
        }
    }
}