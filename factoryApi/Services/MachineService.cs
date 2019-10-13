using System.Collections.Generic;
using factoryApi.DTO;
using factoryApi.Repositories;

namespace factoryApi.Services
{
    public class MachineService
    {
        private readonly MachineRepository _machineRepository;
        private readonly MachineTypeRepository _machineTypeRepository;

        public MachineService(MachineRepository machineMachineRepository,
            MachineTypeRepository machineTypeRepository)
        {
            _machineRepository = machineMachineRepository;
            _machineTypeRepository = machineTypeRepository;
        }

        public MachineDto FindMachineById(long id)
        {
            return _machineRepository.GetById(id);
        }

        public IEnumerable<MachineDto> FindAllMachines()
        {
            return _machineRepository.GetAll();
        }

        public MachineDto AddMachine(CreateMachineDto createMachineDto)
        {
            var machine = _machineRepository.Add(createMachineDto);
            return _machineRepository.GetById(machine.MachineId);
        }

        public MachineDto UpdateMachine(long id, CreateMachineDto createMachineDto)
        {
            return _machineRepository.UpdateElement(id, createMachineDto);
        }

        public MachineTypeDto AddMachineType(CreateMachineTypeDto createMachineTypeDto)
        {
            return _machineTypeRepository.Add(createMachineTypeDto).toDto();
        }
    }
}