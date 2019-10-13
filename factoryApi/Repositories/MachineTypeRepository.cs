using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Models.Machine;
using factoryApi.Models.Relationships;

namespace factoryApi.Repositories
{
    public class MachineTypeRepository : IBaseRepository<CreateMachineTypeDto, MachineTypeDto, MachineType>
    {
        private MasterFactoryContext _context;

        public MachineTypeRepository(MasterFactoryContext context)
        {
            _context = context;
        }

        public MachineTypeDto GetById(long id)
        {
            return GetMachineTypeById(id).toDto();
        }

        private MachineType GetMachineTypeById(long id)
        {
            return _context.MachineTypes.Single(mt => mt.MachineTypeId == id);
        }

        public IEnumerable<MachineTypeDto> GetAll()
        {
            var machineTypes = GetAllMachineTypes();
            IEnumerable<MachineTypeDto> machineTypeDtos = new List<MachineTypeDto>();

            foreach (var machineType in machineTypes)
            {
                machineTypeDtos.Append(machineType.toDto());
            }

            return machineTypeDtos;
        }

        private IEnumerable<MachineType> GetAllMachineTypes()
        {
            return _context.MachineTypes.ToList();
        }

        public MachineType Add(CreateMachineTypeDto writeDto)
        {
            var machineType = _context.MachineTypes.Add(new MachineType(writeDto.Desc)).Entity;
            _context.SaveChanges();

            if (writeDto.OperationList.Count == 0)
            {
                foreach (long id in writeDto.OperationList)
                {
                    var operation = _context.Operations.Find(id);
                    var operationMachineType = _context.OperationMachineTypes.Add(
                        new OperationMachineType()
                        {
                            MachineType = machineType,
                            Operation = operation,
                            MachineTypeId = machineType.MachineTypeId,
                            OperationId = operation.OperationId
                        }
                    ).Entity;
                }
            }

            return machineType;
        }

        public MachineTypeDto UpdateElement(long id, CreateMachineTypeDto Dto)
        {
            throw new System.NotImplementedException();
        }

        public MachineTypeDto DeleteElement(long id)
        {
            throw new System.NotImplementedException();
        }
    }
}