namespace productionApi.Models.Plan
{
    public class OperationFactory
    {
        public static Operation Create(long id,string tool,string type,long eTime, long sTime, long order)
        {
            
            return new Operation(id,tool,type,eTime,sTime, order);
        }
    }
}