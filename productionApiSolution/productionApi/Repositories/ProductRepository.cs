using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using factoryApi.Exceptions;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Models.Product;
using Microsoft.EntityFrameworkCore;

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
            var product = _context.Products.Include(ml => ml.Plan)
                .Single(m => m.ProductId == id);
            //var product = _context.Products.ToList().FirstOrDefault(x => x.ProductId == id);
            if (product == null)
            {
                throw new ObjectNotFoundException("Product not found with the id:  " + id + "!");
            }
                
            return product?.toDto() ;
        }
            
        public IEnumerable<ProductDto> GetAll()
        {
            IEnumerable<Product> products = GetAllProducts();
            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                productDtos.Add(product.toDto());
            }

            return productDtos;
        }
        
        private IEnumerable<Product> GetAllProducts()
        {
            return _context.Products.Include(ml => ml.Plan);
        }
            
        public Product Add(CreateProductDto productDto)
        {
            var op = ProductFactory
                .Create(productDto.ProductName,productDto.Plan);
                
            var result = _context.Add(op).Entity;
            _context.SaveChanges();

            return result;
        }

        public ProductDto UpdateElement(long id, CreateProductDto productDto)
        {
            throw new System.NotImplementedException();
            /*Product op = GetProductById(id);
            if (op == null)
            {
                throw new ObjectNotFoundException("Product not found with the id:  " + id + "!");
            }
            op.ProductName = productDto.ProductName;
            _context.Update(op);
            _context.SaveChanges();
            return GetById(id);
            */
        }

        public ProductDto DeleteElement(long id)
        {
            var productToDelete = GetProductById(id);
            if (productToDelete == null)
            {
                throw new ObjectNotFoundException("Product not found with the id:  " + id + "!");
            }
            _context.Remove(productToDelete);
            _context.SaveChanges();
                
            return productToDelete.toDto();
        }
        
        private Product GetProductById(long id)
        {
            return _context.Products.ToList().FirstOrDefault(x => x.ProductId == id);
        }

    }
    
}