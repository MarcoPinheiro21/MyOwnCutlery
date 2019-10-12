using System;
using System.Collections.Generic;
using System.Linq;
using factoryApi.DTO;
using factoryApi.Models;
using factoryApi.Models.Machine;

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
            Machine machine = GetMachineById(id);
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
            return new Machine(createMachineDto.Description,machineType);
        }

        public MachineDto UpdateElement(long id, CreateMachineDto Dto)
        {
            throw new NotImplementedException();
        }

        public MachineDto DeleteElement(long id)
        {
            throw new NotImplementedException();
        }
    }
}