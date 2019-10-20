using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Models.Machine;
using factoryApi.Models.ProductionLine;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class ProductionLineRepository : IBaseRepository<CreateProductionLineDto, ProductionLineDto, ProductionLine>
    {
        private readonly MasterFactoryContext _context;

        public ProductionLineRepository(MasterFactoryContext context)
        {
            _context = context;
        }

        public ProductionLineDto GetById(long id)
        {
            var productionLine = GetProductionLineById(id);
            if (productionLine == null)
            {
                throw new ObjectNotFoundException("Production Line not found with the id:  " + id + "!");
            }

            return productionLine.toDto();
        }
        private ProductionLine GetProductionLineById(long id)
        {
            try
            {
                return _context.ProductionLines.Include(ml => ml.MachinesList)
                    .ThenInclude(mt => mt.Type).ThenInclude(o => o.OperationMachineType)
                    .Single(m => m.ProductionLineId == id);
            }
            catch (InvalidOperationException e)
            {
                throw new ObjectNotFoundException(
                    "Production Line with id " + id + " not found.");
            }
        }
        public IEnumerable<ProductionLineDto> GetAll()
        {
            IEnumerable<ProductionLine> productionLines = getAllProductionLines();
            var productionLineDtos = new List<ProductionLineDto>();

            foreach (var pl in productionLines)
            {
                productionLineDtos.Add(pl.toDto());
            }

            return productionLineDtos;
        }

        private IEnumerable<ProductionLine> getAllProductionLines()
        {
            return _context.ProductionLines.ToList();
        }

        public ProductionLine Add(CreateProductionLineDto productionLineDto)
        {
            var machines = new List<Machine>();

            foreach (long id in productionLineDto.MachinesListIds)
            {
                var mac = _context.Machines.Include(t => t.Type)
                    .ThenInclude(o => o.OperationMachineType)
                    .Single(machine => machine.MachineId == id);
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

            pl.ProductionLineName = productionLineDto.ProductionLineName;

            var machines = new List<Machine>();

            foreach (long machineId in productionLineDto.MachinesListIds)
            {
                var mac = _context.Machines.Include(t => t.Type)
                    .ThenInclude(o => o.OperationMachineType)
                    .Single(machine => machine.MachineId == machineId);
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
                throw new HttpRequestException("Production Line not found with the id:  " + id + "!");
            }

            _context.Remove(productionLineToDelete);
            _context.SaveChanges();

            return productionLineToDelete.toDto();
        }
    }
}