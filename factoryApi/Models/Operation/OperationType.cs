namespace factoryApi.Models.Operation
{
    public class OperationType
    {
        public OperationType(string desc)
        {
            Desc = desc;
        }

        public string Desc { get; set; }
    }
}