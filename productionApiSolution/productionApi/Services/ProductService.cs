using System.Collections.Generic;
using productionApi.DTO;
using productionApi.Repositories;

namespace productionApi.Services
{
    public class ProductService
    {

        private readonly ProductRepository _repo;
        
        public ProductService(ProductRepository repo)
        {
            _repo = repo;
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
            var product = _repo.Add(productDto);
            return _repo.GetById(product.ProductId);
        }
        
        public ProductDto Update(long id, CreateProductDto productDto)
        {
            return _repo.UpdateElement(id, productDto);
        }
        
        public ProductDto Delete(long id)
        {
            return _repo.DeleteElement(id);
        }
        
    }
}