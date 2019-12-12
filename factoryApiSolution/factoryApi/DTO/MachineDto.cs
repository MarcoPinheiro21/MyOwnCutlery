using System;

namespace factoryApi.DTO
{
    public class MachineDto
    {
        public long Id { get; set; }
        public string Description { get; set; }
        
        public Boolean Active { get; set; }
        public long MachineTypeId { get; set; }

        public long ProductionLineId { get; set; }

        public long ProductionLinePosition { get; set; }

        public MachineDto()
        {
        }

        public MachineDto(long id, string description, Boolean active, long machineType, long productionLineId, long productionLinePosition)
        {
            Id = id;
            Description = description;
            Active = active;
            MachineTypeId = machineType;
            ProductionLineId = productionLineId;
            ProductionLinePosition = productionLinePosition;
        }
        
        public MachineDto(long id, string description, Boolean active, long machineType)
        {
            Id = id;
            Description = description;
            Active = active;
            MachineTypeId = machineType;

        }
    }
}