using System.Collections.Generic;
using System.Linq;
using factoryApi.DTO;
using factoryApi.Models;
using factoryApi.Models.Machine;

namespace factoryApi.Repositories
{
    public class MachineRepository : IBaseRepository<MachineDto, Machine>
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
            return _context.Machines.Single(machine => machine.Id == id);
        }

        public IEnumerable<MachineDto> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public Machine Add(MachineDto writeDto)
        {
            throw new System.NotImplementedException();
        }

        public MachineDto UpdateElement(int id, Machine Dto)
        {
            throw new System.NotImplementedException();
        }

        public MachineDto DeleteElement(int id)
        {
            throw new System.NotImplementedException();
        }

        public MachineDto UpdateElement(long id, Machine Dto)
        {
            throw new System.NotImplementedException();
        }

        public MachineDto DeleteElement(long id)
        {
            throw new System.NotImplementedException();
        }
    }
}