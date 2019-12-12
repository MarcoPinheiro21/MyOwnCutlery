using System;

namespace factoryApi.DTO
{
    public class CreateMachineDto
    {
        public string Description { get; set; }
        
        public Boolean Active { get; set; }
        
        public long MachineTypeId { get; set; }

        public CreateMachineDto()
        {
        }

        public CreateMachineDto(string description, Boolean active, long machineType)
        {
            Active = active;
            Description = description;
            MachineTypeId = machineType;
        }
    }
}