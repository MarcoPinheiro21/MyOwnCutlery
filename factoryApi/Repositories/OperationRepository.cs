using System;
using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Models.Operation;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class OperationRepository
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
        
        public Operation Add(CreateOperationDto operationDto)
        {

            Tool Tool = GetToolById(operationDto.ToolId);

            Operation op = OperationFactory
                    .Create(operationDto.OperationName, Tool);
            
            var result = _context.Add(op).Entity;
            _context.SaveChanges();

            return result;
        }

        public OperationDto Update(long id, CreateOperationDto operationDto)
        {
            OperationDto op = GetById(id);
            op.OperationName = operationDto.OperationName;
            op.ToolId = operationDto.ToolId;
            _context.SaveChanges();
            return GetById(id);
        }

        public OperationDto Delete(long id)
        {
            //TODO
            throw new System.NotImplementedException();
        }

        public Tool addTool(Tool tool)
        { 
            Tool newTool = _context.Tools.Add(tool).Entity;
            _context.SaveChanges();
            return newTool;
        }
        
        public Tool GetToolById(long id)
        {
            return _context.Tools.ToList().FirstOrDefault(t => t.ToolId == id);
        }
    }
}