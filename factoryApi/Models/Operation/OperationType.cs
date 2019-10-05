namespace factoryApi.Models.Operation
{
    public class OperationType
    {
        protected OperationType(string desc)
        {
            Desc = desc;
        }

        private string Desc { get; set; }
    }
}