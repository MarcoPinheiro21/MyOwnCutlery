using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using factoryApi.Context;
using factoryApi.Controllers;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Models.Operation;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class OperationRepository : IBaseRepository<CreateOperationDto, OperationDto, Operation>
    {
        private readonly MasterFactoryContext _context;

        public OperationRepository(MasterFactoryContext context)
        {
            _context = context;
        }
        
        #region Operations
        
            public OperationDto GetById(long id)
            {
                var operation = _context.Operations.ToList().FirstOrDefault(x => x.OperationId == id);
                if (operation == null)
                {
                    throw new ObjectNotFoundException("Operation not found with the id:  " + id + "!");
                }
                
                return operation?.toDto() ;
            }
            
            public IEnumerable<OperationDto> GetAll()
            {
                IEnumerable<Operation> operations = GetAllOperations();
                var operationDtos = new List<OperationDto>();

                foreach (var operation in operations)
                {
                    operationDtos.Add(operation.toDto());
                }

                return operationDtos;
            }

            private IEnumerable<Operation> GetAllOperations()
            {
                return _context.Operations.ToList();
            }
            
            public Operation Add(CreateOperationDto operationDto)
            {

                Tool tool = GetToolById(operationDto.ToolId);
                if (tool == null)
                {
                    throw new ObjectNotFoundException(
                        "Tool not found with the id:  " + operationDto.ToolId + "!");
                }

                Operation op = OperationFactory
                        .Create(operationDto.OperationName, tool);
                
                var result = _context.Add(op).Entity;
                _context.SaveChanges();

                return result;
            }

            public OperationDto UpdateElement(long id, CreateOperationDto operationDto)
            {
                Operation op = GetOperationById(id);
                if (op == null)
                {
                    throw new ObjectNotFoundException("Operation not found with the id:  " + id + "!");
                }
                op.OperationName = operationDto.OperationName;
                
                op.Tool = GetToolById(operationDto.ToolId);
                if (op.Tool == null)
                {
                    throw new ObjectNotFoundException(
                        "Tool not found with the id:  " + operationDto.ToolId + "!");
                }
                
                _context.Update(op);
                _context.SaveChanges();
                return GetById(id);
            }

            public OperationDto DeleteElement(long id)
            {
                var operationToDelete = GetOperationById(id);
                if (operationToDelete == null)
                {
                    throw new ObjectNotFoundException("Operation not found with the id:  " + id + "!");
                }
                _context.Remove(operationToDelete);
                _context.SaveChanges();
                
                return operationToDelete.toDto();
            }

            private Operation GetOperationById(long id)
            {
                return _context.Operations.ToList().FirstOrDefault(x => x.OperationId == id);
            }
        
        #endregion
        
        #region Tools
        
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
        
        #endregion
    }
}