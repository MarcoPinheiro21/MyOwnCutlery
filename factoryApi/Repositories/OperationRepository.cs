using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
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
            var operation = _context.Operations.ToList().FirstOrDefault(x => x.OperationId == id);
            return operation == null ? new OperationDto() : operation.toDto() ;
        }
        
        public IEnumerable<OperationDto> GetAll()
        {
            return _context.Operations.Include(operation => operation.OperationId)
                        .Select(operation => operation.toDto()).ToList();
        }
        
        public Operation Add(OperationDto operationDto)
        {

            Operation op = OperationFactory
                    .Create(operationDto.ToolDesc, operationDto.OperationTypeDesc);
            var result = _context.Add(op).Entity;
            _context.SaveChanges();

            return result;

        }

        public OperationDto UpdateElement(long id, Operation Dto)
        {
            //TODO
            throw new System.NotImplementedException();
        }

        public OperationDto DeleteElement(long id)
        {
            //TODO
            throw new System.NotImplementedException();
        }
    }
}