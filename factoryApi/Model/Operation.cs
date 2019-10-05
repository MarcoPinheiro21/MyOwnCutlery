using System.Collections.Generic;

namespace factoryApi.Model
{
    public class Operation
    {
        private long Id { get; set; }
        private Tool Tool { get; set; }
        private OperationType OperationType { get; set; }

        public Operation(Tool tool, OperationType operationType)
        {
            Tool = tool;
            OperationType = operationType;
        }
    }
}