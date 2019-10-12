using System.Collections.Generic;
using System.Linq;
using factoryApi.DTO;
using factoryApi.Models;
using factoryApi.Models.Operation;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class OperationRepository : IBaseRepository<OperationDto, Operation>
    {
        private readonly MasterFactoryContext _context;

        public OperationRepository(MasterFactoryContext context)
        {
            _context = context;
        }
        
        public OperationDto GetById(long id)
        {
            var operation = _context.Operations.ToList().FirstOrDefault(x => x.Id == id);
            
            //TODO Necessário pensar numa solução para o mapper.
            return operation == null ? new OperationDto() : new OperationDto() ;
        }
        
        public IEnumerable<OperationDto> GetAll()
        {
            //TODO Isto não está feito. Cacete para não dar erro.
            return _context.Operations.Include(x => x.Id).Select(x => new OperationDto()).ToList();
        }
        
        public Operation Add(OperationDto operationDto)
        {
            //TODO Ainda falta fazer isto.
            return new Operation();
        }

        public OperationDto UpdateElement(int id, Operation Dto)
        {
            //TODO
            throw new System.NotImplementedException();
        }

        public OperationDto DeleteElement(int id)
        {
            //TODO
            throw new System.NotImplementedException();
        }
    }
}