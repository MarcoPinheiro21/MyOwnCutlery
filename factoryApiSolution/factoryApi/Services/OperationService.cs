using System.Collections.Generic;
using factoryApi.DTO;
using factoryApi.Models.Operation;
using factoryApi.Repositories;

namespace factoryApi.Services
{
    public class OperationService
    {

        private readonly OperationRepository _repo;
        
        public OperationService(OperationRepository repo)
        {
            _repo = repo;
        }
        
        public OperationDto FindById(int id)
        {
            return _repo.GetById(id);
        }
        
        public IEnumerable<OperationDto> FindAll()
        {
            return _repo.GetAll();
        }
        
        public OperationDto Add(CreateOperationDto operationDto)
        {
            var operation = _repo.Add(operationDto);
            return _repo.GetById(operation.Id);
        }
        
        public OperationDto Update(long id, CreateOperationDto operationDto)
        {
            return _repo.UpdateElement(id, operationDto);
        }
        
        public OperationDto Delete(long id)
        {
            return _repo.DeleteElement(id);
        }
        
        public IEnumerable<Tool> FindAllTools()
        {
            return _repo.GetAllTools();
        }
        
        public IEnumerable<OperationType> FindAllOperationTypes()
        {
            return _repo.GetAllOperationTypes();
        }
    }
}