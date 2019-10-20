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

        public override bool Equals(object obj)
        {
            if (obj.GetType() != GetType()) return false;

            if (obj == null) return false;

            var anotherObj = (OperationMachineType) obj;


            return MachineTypeId.Equals(anotherObj.MachineTypeId) &&
                   OperationId.Equals(anotherObj.OperationId);
        }
    }
}