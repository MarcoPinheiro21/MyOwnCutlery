using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace factoryApi.Models.Operation
{
    public class Tool
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public long ToolId { get; set; }
        public string Desc { get; set; }

        public Tool(long toolId, string desc)
        {
            ToolId = toolId;
            Desc = desc;
        }
    }
}