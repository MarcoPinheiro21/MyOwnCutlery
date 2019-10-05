namespace factoryApi.Model
{
    public class Tool
    {
        private string Desc { get; set; }

        protected Tool(string desc)
        {
            Desc = desc;
        }
    }
}