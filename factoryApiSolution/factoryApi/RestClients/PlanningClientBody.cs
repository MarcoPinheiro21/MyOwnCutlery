namespace factoryApi.RestClients
{
    public class PlanningClientBody
    {
        public string initialDate { get; set; }
        public string finalDate { get; set; }

        public PlanningClientBody(string initialDate, string finalDate)
        {
            this.initialDate = initialDate;
            this.finalDate = finalDate;
        }
    }
}