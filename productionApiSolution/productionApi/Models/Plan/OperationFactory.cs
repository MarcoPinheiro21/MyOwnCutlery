namespace productionApi.Models.Plan
{
    public class OperationFactory
    {
        public static Operation Create(long OperationId)
        {
            
            return new Operation(OperationId);
        }
    }
}