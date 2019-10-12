namespace factoryApi.DTO
{
    public class CreateMachineDto
    {
        public string Description { get; set; }
        public long MachineTypeId { get; set; }

        public CreateMachineDto()
        {
        }

        public CreateMachineDto(string description, long machineType)
        {
            Description = description;
            MachineTypeId = machineType;
        }
    }
}