namespace factoryApi.DTO
{
    public class MachineDto
    {
        public long Id { get; set; }
        public string Description { get; set; }
        private string MachineType { get; set; }

        public MachineDto()
        {
        }

        public MachineDto(long id, string description, string machineType)
        {
            Id = id;
            Description = description;
            MachineType = machineType;
        }
    }
}