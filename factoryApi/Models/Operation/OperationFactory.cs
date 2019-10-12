namespace factoryApi.Models.Operation
{
    public class OperationFactory
    {
        public static Operation Create(
            string toolDesc, string operationTypeDesc)
        {
            return new Operation()
            {
                 Tool = new Tool(toolDesc),
                 OperationType = new OperationType(operationTypeDesc)
            };
        }
    }
}