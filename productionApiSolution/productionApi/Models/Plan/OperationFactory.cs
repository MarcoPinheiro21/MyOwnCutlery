namespace productionApi.Models.Plan
{
    public class OperationFactory
    {
        public static Operation Create(long OperationId,string tool,string type)
        {
            
            return new Operation(OperationId,tool,type);
        }
    }
}