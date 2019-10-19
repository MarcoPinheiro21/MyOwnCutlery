using System.Collections.Generic;
using factoryApi.Exceptions;
using productionApi.DTO;
using productionApi.Models.Plan;
using productionApi.Repositories;

namespace productionApi.Services
{
    public class PlanService
    {
        private readonly PlanRepository _repo;
        private readonly OperationService _opService;
        
        public PlanService(PlanRepository repo)
        {
            _repo = repo;
        }
        
        public PlanDto FindById(int id)
        {
            return _repo.GetById(id);
        }
        
        public IEnumerable<PlanDto> FindAll()
        {
            return _repo.GetAll();
        }
        
        public PlanDto Add(CreatePlanDto planDto)
        //planDto.Operations
        {
            if (_opService.validateOperations(planDto.Operations))
            {
                var plan = _repo.Add(planDto);
                return _repo.GetById(plan.PlanId);
            }
            else
            {
                throw new ObjectNotFoundException();
            }
        }
        
        public PlanDto Update(long id, CreatePlanDto planDto)
        {
            return _repo.UpdateElement(id, planDto);
        }
        
        public PlanDto Delete(long id)
        {
            return _repo.DeleteElement(id);
        }
    }
}