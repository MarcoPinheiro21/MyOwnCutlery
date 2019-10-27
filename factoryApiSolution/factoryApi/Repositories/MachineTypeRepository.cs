using System;
using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Models.Machine;
using factoryApi.Models.Relationships;
using Microsoft.EntityFrameworkCore;

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

        public MachineType GetMachineTypeById(long id)
        {
            var result = _context.MachineTypes
                .Include(t => t.OperationMachineType)
                .ThenInclude(o => o.Operation)
                .ThenInclude(o => o.OperationType)
                .Include(t => t.OperationMachineType)
                .ThenInclude(o => o.Operation)
                .ThenInclude(t => t.Tool)
                .SingleOrDefault(mt => mt.Id == id);
            if (result == null)
            {
                throw new ObjectNotFoundException(
                    "Machine type with id " + id + " does not exist.");
            }

            return result;
        }

        private MachineType GetMachineTypeById(long id, bool includeOperations)
        {
            if (!includeOperations) return GetMachineTypeById(id);

            return _context.MachineTypes
                .Include(t => t.OperationMachineType)
                .SingleOrDefault(i => i.Id == id);
        }

        public IEnumerable<MachineTypeDto> GetAll()
        {
            var machineTypes = GetAllMachineTypes();
            var machineTypeDtos = new List<MachineTypeDto>();

            foreach (var machineType in machineTypes)
            {
                machineTypeDtos.Add(machineType.toDto());
            }

            return machineTypeDtos;
        }

        private IEnumerable<MachineType> GetAllMachineTypes()
        {
            return _context.MachineTypes
                .Include(o => o.OperationMachineType).ToList();
        }

        public MachineType Add(CreateMachineTypeDto writeDto)
        {
            var machineType = _context.MachineTypes
                .Add(new MachineType(writeDto.Desc)).Entity;

            var opMachineType = new List<OperationMachineType>();

            if (writeDto.OperationList.Count != 0)
            {
                foreach (long id in writeDto.OperationList)
                {
                    var operation = _context.Operations.Find(id);

                    if (operation == null)
                    {
                        throw new ObjectNotFoundException(
                            "Operation with id " + id + " not found.");
                    }

                    var operationMachineType = _context.OperationMachineTypes.Add(
                        new OperationMachineType(machineType.Id,
                            machineType,
                            operation.Id,
                            operation)).Entity;
                }
            }

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                Console.WriteLine(e);
                throw new DuplicatedObjectException("A Machine Type with the same description already exists");
            }

            return machineType;
        }

        public MachineTypeDto UpdateElement(long id, CreateMachineTypeDto Dto)
        {
            var machineType = GetMachineTypeById(id);

            if (machineType == null)
            {
                throw new ObjectNotFoundException(
                    "Machine type with id " + id + " not found.");
            }

            if (null != Dto.Desc && Dto.Desc.Trim().Length > 0)
            {
                machineType.Desc = Dto.Desc;
            }

            var operationMachineTypeList = new List<OperationMachineType>();

            foreach (var op in Dto.OperationList)
            {
                var operation = _context.Operations
                    .Include(o => o.OperationType)
                    .Include(t => t.OperationMachineType)
                    .ThenInclude(o => o.Operation)
                    .ThenInclude(t => t.Tool)
                    .SingleOrDefault(o => o.Id == op);

                if (operation == null)
                {
                    throw new ObjectNotFoundException(
                        "Operation with id " + op + " not found.");
                }

                var operationMachineType = new OperationMachineType(machineType.Id,
                    machineType, op, operation);

                if (operationMachineTypeList.Contains(operationMachineType))
                {
                    throw new ArgumentException("Duplicated operations not allowed.");
                }

                operationMachineTypeList.Add(operationMachineType);
            }


            machineType.OperationMachineType = operationMachineTypeList;
            //var result = machineType.toDto();

            _context.SaveChanges();
            return GetMachineTypeById(id).toDto();
        }

        public MachineTypeDto DeleteElement(long id)
        {
            return DeleteMachineType(id).toDto();
        }

        private MachineType DeleteMachineType(long id)
        {
            var machineTypeToDelete = _context.MachineTypes.Find(id);
            _context.MachineTypes.Remove(machineTypeToDelete);
            _context.SaveChanges();
            return machineTypeToDelete;
        }
    }
}