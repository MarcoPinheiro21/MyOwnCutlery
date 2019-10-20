using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.DTO;

namespace factoryApi.Models.ProductionLine
{
    public class ProductionLine
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long ProductionLineId { get; set; }

        [Required] public string ProductionLineName { get; set; }

        public ICollection<Machine.Machine> MachinesList { get; set; }

        public ProductionLine()
        {
        }

        public ProductionLine(string name, ICollection<Machine.Machine> machinesList)
        {
            ProductionLineName = name;
            MachinesList = machinesList;
        }

        public ProductionLineDto toDto()
        {
            ProductionLineDto productionLineDto = new ProductionLineDto(ProductionLineId,ProductionLineName,new List<MachineDto>());
            productionLineDto.ProductionLineId = ProductionLineId;
            productionLineDto.ProductionLineName = ProductionLineName;
            foreach (Machine.Machine machine in MachinesList)
            {
                productionLineDto.MachinesListDtos.Add(machine.toDto());
            }
            return productionLineDto;
        }
    }
}