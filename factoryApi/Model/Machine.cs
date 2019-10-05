namespace factoryApi.Model
{
    public class Machine
    {
        private long Id { get; set; }
        private MachineType Type { get; set; }
        
        public Machine(MachineType type)
        {
            Type = type;
        }
    }
}