using System.Collections.Generic;
using factoryApi.Exceptions;
using productionApi.DTO;
using productionApi.Repositories;

namespace productionApi.Services
{
    public class ProductService
    {
        private readonly ProductRepository _repo;
        private readonly OperationRepository _operationRepository;
        private readonly OperationService _opService;

        public ProductService(ProductRepository repo, OperationRepository opRepo)
        {
            _repo = repo;
            _opService = new OperationService();
            _operationRepository = opRepo;
        }

        public ProductDto FindById(int id)
        {
            return _repo.GetById(id);
        }

        public IEnumerable<ProductDto> FindAll()
        {
            return _repo.GetAll();
        }

        public ProductDto Add(CreateProductDto productDto)
        {
            if (_opService.validateOperations(productDto.Plan.OperationList))
            {
                var product = _repo.Add(productDto);
                return _repo.GetById(product.ProductId);
            }
            else
            {
                throw new ObjectNotFoundException();
            }
        }

        public ProductDto Update(long id, CreateProductDto productDto)
        {
            return _repo.UpdateElement(id, productDto);
        }

        public ProductDto Delete(long id)
        {
            return _repo.DeleteElement(id);
        }

        public ICollection<OperationDto> FindPlanByProduct(long id)
        {
            var product = _repo.GetById(id);


            ICollection<OperationDto> result = _operationRepository.GetByPlanId(product.PlanId);


            return result;
        }
    }
}