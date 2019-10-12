using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
            return productionLine == null ? new ProductionLineDto() : productionLine.toDto();
        }

        public IEnumerable<ProductionLineDto> GetAll()
        {
            return _context.ProductionLines.Include(productionLine => productionLine.ProdutctLineId)
                .Select(productionLine => productionLine.toDto()).ToList();
        }

        public ProductionLine Add(CreateProductionLineDto productionLineDto)
        {
            List<Machine> machines = new List<Machine>();

            foreach (long id in productionLineDto.MachinesListIds)
            {
                Machine mac = _context.Machines.Single(machine => machine.MachineId == id);
                if (mac == null)
                {
                    throw new HttpRequestException("Machine not found with the id: " + id + "!");
                }

                machines.Add(mac);
            }

            ProductionLine pl = ProductionLineFactory
                .Create(productionLineDto.ProductionLineName, machines);

            var result = _context.Add(pl).Entity;
            _context.SaveChanges();

            return result;
        }

        public ProductionLineDto UpdateElement(long id, CreateProductionLineDto productionLineDto)
        {
            ProductionLine pl = GetProductionLineById(id);
            if (pl == null)
            {
                throw new HttpRequestException("Production Line not found with the id:  " + id + "!");
            }

            pl.ProdutctLineName = productionLineDto.ProductionLineName;

            List<Machine> machines = new List<Machine>();

            foreach (long machineId in productionLineDto.MachinesListIds)
            {
                Machine mac = _context.Machines.Single(machine => machine.MachineId == machineId);
                if (mac == null)
                {
                    throw new HttpRequestException("Machine not found with the id: " + id + "!");
                }

                machines.Add(mac);
            }

            pl.MachinesList = machines;

            _context.Update(pl);
            _context.SaveChanges();
            return GetById(id);
        }

        public ProductionLineDto DeleteElement(long id)
        {
            var productionLineToDelete = GetProductionLineById(id);
            if (productionLineToDelete == null)
            {
                throw new HttpRequestException("Production line not found with the id:  " + id + "!");
            }

            _context.Remove(productionLineToDelete);
            _context.SaveChanges();

            return productionLineToDelete.toDto();
        }

        private ProductionLine GetProductionLineById(long id)
        {
            return _context.ProductionLines.ToList().FirstOrDefault(pl => pl.ProdutctLineId == id);
        }
    }
}