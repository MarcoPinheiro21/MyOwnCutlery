using System;
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

        [ForeignKey("MachineType")] public MachineType Type { get; set; }

        [ForeignKey("ProductionLineId")]
        public ProductionLine.ProductionLine ProductionLine { get; set; } 
        
        protected Machine()
        {
        }

        public Machine(string description, MachineType type)
        {
            if (null == description || description.Trim().Length == 0)
            {
                throw new ArgumentNullException("Invalid machine description.");
            }

            if (null == type)
            {
                throw new ArgumentNullException("Machine should has a machine type");
            }

            Description = description;
            Type = type;
        }

        public MachineDto toDto()
        {
            return new MachineDto(MachineId, Description, Type.MachineTypeId);
        }
    }
}