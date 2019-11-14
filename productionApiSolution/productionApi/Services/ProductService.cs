using System.Collections.Generic;
using System.Linq;
using factoryApi.Exceptions;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Repositories;

namespace productionApi.Services
{
    public class ProductService
    {
        private readonly ProductRepository _repo;
        private readonly OperationRepository _operationRepository;
        private readonly OperationService _opService;

        public ProductService(ProductRepository repo, OperationRepository opRepo, RestContext rest)
        {
            _repo = repo;
            _operationRepository = opRepo;
            _opService = new OperationService(rest);
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
            ICollection<CreateOperationDto> newList = _opService.matchOperations(productDto.Plan.OperationList);
            if (newList.ToList().Count!=0)
            {
                productDto.Plan.OperationList = newList;
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