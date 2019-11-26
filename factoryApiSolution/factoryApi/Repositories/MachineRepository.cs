using System;
using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Models.Machine;
using factoryApi.Models.ProductionLine;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class MachineRepository : IBaseRepository<CreateMachineDto, MachineDto, Machine>
    {
        private MasterFactoryContext _context;

        public MachineRepository(MasterFactoryContext context)
        {
            _context = context;
        }

        public MachineDto GetById(long id)
        {
            var machine = GetMachineById(id);
            if (machine == null)
            {
                throw new ObjectNotFoundException(
                    "Machine type with id " + id + " not found");
            }

            return machine.toDto();
        }

        private Machine GetMachineById(long id)
        {
            try
            {
                return _context.Machines.Include(t => t.Type)
                    .Include(pl => pl.ProductionLine)
                    .SingleOrDefault(machine => machine.Id == id);
            }
            catch (InvalidOperationException e)
            {
                throw new ObjectNotFoundException(
                    "Machine with id " + id + " not found.");
            }
        }

        public IEnumerable<MachineDto> GetByType(long typeId)
        {
            var result = new List<MachineDto>();
            var machines = GetMachineByType(typeId);
            foreach (var machine in machines)
            {
                result.Add(machine.toDto());
            }

            return result;
        }

        private IEnumerable<Machine> GetMachineByType(long typeId)
        {
            try
            {
                return _context.Machines.Include(t => t.Type)
                    .Include(pl => pl.ProductionLine)
                    .Where(t => t.Type.Id == typeId);
            }
            catch (InvalidOperationException e)
            {
                throw new ObjectNotFoundException(
                    "Machine type with id " + typeId + " not found.");
            }
        }

        public IEnumerable<MachineDto> GetAll()
        {
            IEnumerable<Machine> machines = GetAllMachines();
            var machinesDto = new List<MachineDto>();

            foreach (var machine in machines)
            {
                machinesDto.Add(machine.toDto());
            }

            return machinesDto;
        }

        private IEnumerable<Machine> GetAllMachines()
        {
            return _context.Machines.Include(t => t.Type)
                .Include(pl => pl.ProductionLine);
        }

        public Machine Add(CreateMachineDto createMachineDto)
        {
            var machineType = _context.MachineTypes.Find(createMachineDto.MachineTypeId);
            if (machineType == null)
            {
                throw new ObjectNotFoundException(
                    "Machine type with id " + createMachineDto.MachineTypeId + " not found.");
            }

            var result = _context.Machines
                .Add(new Machine(createMachineDto.Description, machineType)).Entity;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                Console.WriteLine(e);
                throw new DuplicatedObjectException("A Machine with the same description already exists");
            }


            return result;
        }

        public MachineDto UpdateElement(long id, CreateMachineDto Dto)
        {
            var machineToUpdate = _context.Machines
                .Include(t => t.Type)
                .Include(pl => pl.ProductionLine)
                .SingleOrDefault(i => i.Id == id);

            if (Dto.Description != null)
            {
                machineToUpdate.Description = Dto.Description;
            }

            if (Dto.MachineTypeId != 0)
            {
                var machineType = _context.MachineTypes.Find(Dto.MachineTypeId);
                if (machineType == null)
                {
                    throw new ObjectNotFoundException(
                        "MachineType with id " + Dto.MachineTypeId + " not found.");
                }

                machineToUpdate.Type = machineType;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                Console.WriteLine(e);
                throw new DuplicatedObjectException("A Machine with the same description already exists");
            }

            return machineToUpdate.toDto();
        }
        
        public MachineDto UpdateElement(long id, MachineDto Dto)
        {
            var machineToUpdate = _context.Machines
                .Include(t => t.Type)
                .Include(pl => pl.ProductionLine)
                .SingleOrDefault(i => i.Id == id);

            if (Dto.Description != null)
            {
                machineToUpdate.Description = Dto.Description;
            }

            if (Dto.MachineTypeId != 0)
            {
                var machineType = _context.MachineTypes.Find(Dto.MachineTypeId);
                if (machineType == null)
                {
                    throw new ObjectNotFoundException(
                        "MachineType with id " + Dto.MachineTypeId + " not found.");
                }

                machineToUpdate.Type = machineType;
            }
            machineToUpdate.ProductionLine= _context.ProductionLines.Where(pos => pos.Id == Dto.ProductionLineId).ToList()[0];
            var machineWithSamePosition =
                GetMachineByPosition(Dto.ProductionLinePosition, machineToUpdate.ProductionLine).ToList();

            if (machineWithSamePosition.Count == 0)
            {
                machineToUpdate.ProductionLinePosition = Dto.ProductionLinePosition;
            }
            else
            {
                machineWithSamePosition[0].ProductionLinePosition = machineToUpdate.ProductionLinePosition;
                machineToUpdate.ProductionLinePosition = Dto.ProductionLinePosition;
            }
            

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                Console.WriteLine(e);
                throw new DuplicatedObjectException("A Machine with the same description already exists");
            }

            return machineToUpdate.toDto();
        }
        private IEnumerable<Machine> GetMachineByPosition(long position, ProductionLine pl)
        {
            return _context.Machines.Include(t => t.Type)
                    .Include(p => p.ProductionLine)
                    .Where(pos => pos.ProductionLinePosition == position)
                    .Where(pos => pos.ProductionLine == pl);
        }

        public MachineDto DeleteElement(long id)
        {
            var machineToDelete = _context.Machines.Include(m => m.Type)
                .SingleOrDefault(m => m.Id == id);
            if (machineToDelete == null)
            {
                throw new ObjectNotFoundException(
                    "Machine with id " + id + " not found.");
            }

            _context.Machines.Remove(machineToDelete);
            _context.SaveChanges();
            
            return machineToDelete.toDto();
        }
    }
}