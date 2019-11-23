using System.Collections.Generic;
using factoryApi.DTO;
using factoryApi.Repositories;

namespace factoryApi.Services
{
    public class MachineService
    {
        private readonly MachineRepository _machineRepository;
        private readonly MachineTypeRepository _machineTypeRepository;
        private readonly OperationRepository _operationRepository;

        public MachineService(MachineRepository machineMachineRepository,
            MachineTypeRepository machineTypeRepository,
            OperationRepository operationRepository)
        {
            _machineRepository = machineMachineRepository;
            _machineTypeRepository = machineTypeRepository;
            _operationRepository = operationRepository;
        }

        public MachineDto FindMachineById(long id)
        {
            return _machineRepository.GetById(id);
        }

        public IEnumerable<MachineDto> FindMachineByType(long id)
        {
            return _machineRepository.GetByType(id);
        }

        public IEnumerable<MachineDto> FindAllMachines()
        {
            return _machineRepository.GetAll();
        }

        public MachineDto AddMachine(CreateMachineDto createMachineDto)
        {
            var machine = _machineRepository.Add(createMachineDto);
            return _machineRepository.GetById(machine.Id);
        }

        public MachineDto UpdateMachine(long id, CreateMachineDto createMachineDto)
        {
            return _machineRepository.UpdateElement(id, createMachineDto);
        }

        public MachineDto DeleteMachine(long id)
        {
            return _machineRepository.DeleteElement(id);
        }

        public IEnumerable<MachineTypeDto> FindAllMachineTypes()
        {
            return _machineTypeRepository.GetAll();
        }

        public MachineTypeDto AddMachineType(CreateMachineTypeDto createMachineTypeDto)
        {
            var machineType = _machineTypeRepository.Add(createMachineTypeDto);
            return FindMachineTypeById(machineType.Id);
        }

        public MachineTypeDto FindMachineTypeById(long id)
        {
            return _machineTypeRepository.GetById(id);
        }

        public IEnumerable<OperationDto> FindOperationByMachineType(long machineTypeId)
        {
            var result = new List<OperationDto>();
            var machineType = _machineTypeRepository.GetMachineTypeById(machineTypeId);

            foreach (var op in machineType.OperationMachineType)
            {
                var operation = _operationRepository.GetById(op.OperationId);
                result.Add(operation);
            }

            return result;
        }

        public MachineTypeDto UpdateOperationsOfMachineType(long typeId,
            CreateMachineTypeDto createOperationDto)
        {
            var result = _machineTypeRepository.UpdateElement(typeId, createOperationDto);
            return FindMachineTypeById(result.Id);
        }
        
        public MachineTypeDto UpdateVisualizationModelOfMachineType(long typeId,
            MachineTypeDto machineTypeDto)
        {
            var result = _machineTypeRepository.UpdateElement(typeId, machineTypeDto);
            return FindMachineTypeById(result.Id);
        }
        
        public MachineDto UpdatePositionOfMachine(long typeId,
            MachineDto machineDto)
        {
            var result = _machineRepository.UpdateElement(typeId, machineDto);
            return FindMachineById(result.Id);
        }

        public MachineTypeDto DeleteMachineType(long typeId)
        {
            return _machineTypeRepository.DeleteElement(typeId);
        }
    }
}