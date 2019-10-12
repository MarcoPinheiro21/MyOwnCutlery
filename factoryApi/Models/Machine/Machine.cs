using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.DTO;

namespace factoryApi.Models.Machine
{
    public class Machine
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long Id { get; set; }

        [Required] public string Description { get; set; }

        [ForeignKey("MachineType")]
        public MachineType Type { get; set; }

        public MachineDto toDto()
        {
            return new MachineDto(this.Id, this.Description, this.Type.Desc);
            
        }
    }
}