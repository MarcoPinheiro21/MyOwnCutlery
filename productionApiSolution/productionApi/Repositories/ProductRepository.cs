using System;
using System.Collections.Generic;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Models.Product;

namespace productionApi.Repositories
{
    public class ProductRepository: IBaseRepository<CreateProductDto, ProductDto, Product>
    {
        private readonly MasterProductionContext _context;

        public ProductRepository(MasterProductionContext context)
        {
            _context = context;
        }

        public ProductDto GetById(long id)
        {
            throw new NotImplementedException();
        }
            
        public IEnumerable<ProductDto> GetAll()
        {
            throw new NotImplementedException();
        }
            
        public Product Add(CreateProductDto productDto)
        {
            throw new NotImplementedException();
        }

        public ProductDto UpdateElement(long id, CreateProductDto productDto)
        {
            throw new NotImplementedException();    
        }

        public ProductDto DeleteElement(long id)
        {
            throw new NotImplementedException();
        }

        private Product GetProductById(long id)
        {
            throw new NotImplementedException();
        }
            
    }
    
}