using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Models;
using factoryApi.Models.Machine;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Repositories
{
    public class MachineRepository : IBaseRepository<CreateMachineDto, MachineDto, Machine>
    {
        private Context.MasterFactoryContext _context;

        public MachineRepository(Context.MasterFactoryContext context)
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
            return _context.Machines.Single(machine => machine.MachineId == id);
        }

        public IEnumerable<MachineDto> GetAll()
        {
            IEnumerable<Machine> Machines = GetAllMachines();
            IEnumerable<MachineDto> MachinesDto = new List<MachineDto>();

            foreach (var machine in Machines)
            {
                MachinesDto.Append(machine.toDto());
            }

            return MachinesDto;
        }

        private IEnumerable<Machine> GetAllMachines()
        {
            return _context.Machines.ToList();
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
            _context.SaveChanges();
            return result;
        }

        public MachineDto UpdateElement(long id, CreateMachineDto Dto)
        {

            var machineToUpdate = _context.Machines.Include(t => t.Type)
                .SingleOrDefault(i => i.MachineId == id);
            
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

            _context.SaveChanges();
            return machineToUpdate.toDto();
        }

        public MachineDto DeleteElement(long id)
        {
            var machine = _context.Machines.Find(id);
            if (machine == null)
            {
                throw new ObjectNotFoundException(
                    "Machine with id " + id + " not found.");
            }

            return _context.Machines.Remove(machine).Entity.toDto();
        }
    }
}