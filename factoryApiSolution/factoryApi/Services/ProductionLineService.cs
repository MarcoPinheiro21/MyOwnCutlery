using System.Collections.Generic;
using factoryApi.DTO;
using factoryApi.Repositories;

namespace factoryApi.Services
{
    public class ProductionLineService
    {
        private readonly ProductionLineRepository _repo;

        public ProductionLineService(ProductionLineRepository repo)
        {
            _repo = repo;
        }

        public ProductionLineDto FindById(int id)
        {
            return _repo.GetById(id);
        }

        public IEnumerable<ProductionLineDto> FindAll()
        {
            return _repo.GetAll();
        }

        public ProductionLineDto Add(CreateProductionLineDto productionLineDto)
        {
            var productionLine = _repo.Add(productionLineDto);
            return _repo.GetById(productionLine.Id);
        }

        public ProductionLineDto Update(long id, CreateProductionLineDto productionLineDto)
        {
            return _repo.UpdateElement(id, productionLineDto);
        }

        public ProductionLineDto Delete(long id)
        {
            return _repo.DeleteElement(id);
        }
    }
}