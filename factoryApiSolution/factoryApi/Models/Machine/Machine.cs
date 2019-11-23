using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.DTO;

namespace factoryApi.Models.Machine
{
    public class Machine : Entity
    {
        [Required] public string Description { get; set; }

        [ForeignKey("MachineType")] public MachineType Type { get; set; }

        [ForeignKey("ProductionLineId")] public ProductionLine.ProductionLine ProductionLine { get; set; }

        public long ProductionLinePosition { get; set; }

        protected Machine()
        {
        }

        public Machine(string description, MachineType type)
        {
            ProductionLinePosition = 0;
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
            if (ProductionLine == null)
            {
                return new MachineDto(Id, Description, Type.Id);
            }

            return new MachineDto(Id, Description, Type.Id, ProductionLine.Id, ProductionLinePosition);
        }
    }
}