using factoryApi.Models.Machine;

namespace factoryApi.Models.Relationships
{
    public class OperationMachineType
    {
        public long MachineTypeId { get; set; }
        public MachineType MachineType { get; set; }
        public long OperationId { get; set; }
        public Operation.Operation Operation { get; set; }

        public OperationMachineType()
        {
        }

        public OperationMachineType(long machineTypeId, MachineType machineType, long operationId,
            Operation.Operation operation)
        {
            MachineTypeId = machineTypeId;
            MachineType = machineType;
            OperationId = operationId;
            Operation = operation;
        }
    }
}