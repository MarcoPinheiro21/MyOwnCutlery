namespace factoryApi.Models.Operation
{
    public class Tool
    {
        protected Tool(string desc)
        {
            Desc = desc;
        }

        private string Desc { get; set; }
    }
}