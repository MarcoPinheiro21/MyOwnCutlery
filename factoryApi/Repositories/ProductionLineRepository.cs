using System;
using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Models.Machine;
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
            return productionLine == null ? new ProductionLineDto() : productionLine.toDto() ;
        }
        
        public IEnumerable<ProductionLineDto> GetAll()
        {
            return _context.ProductionLines.Include(productionLine => productionLine.ProdutctLineId)
                .Select(productionLine => productionLine.toDto()).ToList();
        }
        
        public ProductionLine Add(CreateProductionLineDto productionLineDto)
        {
         //  ICollection<Machine> MachinesList = MachineRepository
          

            ProductionLine op = ProductionLineFactory
                .Create(productionLineDto.ProductionLineName, productionLineDto.MachinesList);
            
            var result = _context.Add(op).Entity;
            _context.SaveChanges();

            return result;
        }

        public ProductionLineDto UpdateElement(long id, CreateProductionLineDto productionLineDto)
        {
            ProductionLineDto pl = GetById(id);
            pl.ProdutctLineName = productionLineDto.ProductionLineName;
            pl.MachinesList = productionLineDto.MachinesList;
            _context.SaveChanges();
            return GetById(id);
        }

        public ProductionLineDto DeleteElement(long id)
        {
            throw new NotImplementedException();
        }

    }
}