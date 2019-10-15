namespace factoryApi.Models.Operation
{
    public class OperationFactory
    {
        public static Operation Create(string operationName, Tool tool)
        {
            return new Operation(operationName, tool);
        }
    }
}