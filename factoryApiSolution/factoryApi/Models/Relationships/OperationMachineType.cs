using factoryApi.Models.Machine;

namespace factoryApi.Models.Relationships
{
    public class OperationMachineType
    {
        public long MachineTypeId { get; set; }
        public MachineType MachineType { get; set;}
        public long OperationId { get; set; }
        public Operation.Operation Operation { get; set; }
    }
}