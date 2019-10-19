namespace productionApi.Models.Plan
{
    public class PlanFactory
    {
        
        public static Plan Create(string planName)
        {
            return new Plan(planName);
        }
    }
}