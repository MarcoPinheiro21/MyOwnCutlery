using System.Collections.Generic;
using factoryApi.DTO;
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
        
        public OperationDto Add(OperationDto operationDto)
        {
            var operation = _repo.Add(operationDto);
            return _repo.GetById(operation.OperationId);
        }
        
    }
}