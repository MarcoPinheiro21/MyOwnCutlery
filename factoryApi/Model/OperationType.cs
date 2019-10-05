namespace factoryApi.Model
{
    public class OperationType
    {
        private string Desc { get; set; }

        protected OperationType(string desc)
        {
            Desc = desc;
        }
    }
}