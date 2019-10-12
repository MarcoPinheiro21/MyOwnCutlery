using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Models.ProductionLine;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class ProductionLineRepository
    {
        private readonly MasterFactoryContext _context;

        public ProductionLineRepository(MasterFactoryContext context)
        {
            _context = context;
        }

        public ProductionLineDto GetById(long id)
        {
            var productionLine = _context.ProductionLines.ToList().FirstOrDefault(pl => pl.ProdutctLineId == id);
            return productionLine == null ? new ProductionLineDto() : productionLine.toDto();
        }

        public IEnumerable<ProductionLineDto> GetAll()
        {
            return _context.ProductionLines.Include(pl => pl.ProdutctLineId)
                .Select(productionLine => productionLine.toDto()).ToList();
        }

        public ProductionLine Add(ProductionLineDto productionLineDto)
        {
            ProductionLine pl = ProductionLineFactory
                .Create(productionLineDto.Name, productionLineDto.MachinesList);
            var result = _context.Add(pl).Entity;
            _context.SaveChanges();

            return result;
        }

        public ProductionLineDto UpdateElement(long id, ProductionLine Dto)
        {
            //TODO
            throw new System.NotImplementedException();
        }

        public ProductionLineDto DeleteElement(long id)
        {
            //TODO
            throw new System.NotImplementedException();
        }
    }
}