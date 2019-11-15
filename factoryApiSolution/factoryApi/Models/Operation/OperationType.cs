using factoryApi.DTO;

namespace factoryApi.Models.Operation
{
    public class OperationType : Entity
    {
        public string OperationTypeName { get; set; }
        
        public long ExecutionTime { get; set; }
        
        public long SetupTime { get; set; }

        public OperationType(string operationTypeName)
        {
            OperationTypeName = operationTypeName;
        }
        
        public OperationType(string operationTypeName, 
            long executionDuration, long setupDuration)
        {
            OperationTypeName = operationTypeName;
            ExecutionTime = executionDuration;
            SetupTime = setupDuration;
        }

        public OperationTypeDto toDto()
        {
            return new OperationTypeDto
            {
                OperationTypeId = Id, 
                Desc = OperationTypeName, 
                ExecutionTime = ExecutionTime, 
                SetupTime = SetupTime
            };
        }
    }
}