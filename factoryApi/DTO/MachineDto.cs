namespace factoryApi.DTO
{
    public class MachineDto
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public long MachineTypeId { get; set; }

        public MachineDto()
        {
        }

        public MachineDto(long id, string description, long machineType)
        {
            Id = id;
            Description = description;
            MachineTypeId = machineType;
        }
    }
}