using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.DTO;

namespace factoryApi.Models.Machine
{
    public class Machine
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long MachineId { get; set; }

        [Required] public string Description { get; set; }

        [ForeignKey("MachineType")]
        public MachineType Type { get; set; }

        public Machine()
        {
        }

        public Machine(string description, MachineType type)
        {
            Description = description;
            Type = type;
        }

        public MachineDto toDto()
        {
            return new MachineDto(MachineId, Description, Type.MachineTypeId);
            
        }
    }
}