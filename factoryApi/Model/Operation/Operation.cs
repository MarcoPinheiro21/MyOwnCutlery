namespace factoryApi.Model.Operation
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