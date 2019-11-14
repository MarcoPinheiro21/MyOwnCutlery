using System.Collections.Generic;
using System.Linq;
using factoryApi.Exceptions;
using Microsoft.EntityFrameworkCore;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Models.Plan;

namespace productionApi.Repositories
{
    public class OperationRepository: IBaseRepository<CreateOperationDto, OperationDto, Operation>
    {
        private readonly MasterProductionContext _context;

        public OperationRepository(MasterProductionContext context)
        {
            _context = context;
        }
        public OperationDto GetById(long id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<OperationDto> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public Operation Add(CreateOperationDto writeDto)
        {
            throw new System.NotImplementedException();
        }

        public OperationDto UpdateElement(long id, CreateOperationDto Dto)
        {
            throw new System.NotImplementedException();
        }

        public OperationDto DeleteElement(long id)
        {
            throw new System.NotImplementedException();
        }
        
        public ICollection<OperationDto> GetByPlanId(long id)
        {
            ICollection<OperationDto> result =  new List<OperationDto>();
            ICollection<Operation> operations = _context.Operations.Where(x => x.PlanId == id).ToList();
               
            //var product = _context.Products.ToList().FirstOrDefault(x => x.ProductId == id);
            foreach (var op in operations)
            {
                result.Add(op.toDto());
            }
            return result;
        }
        
    }
}