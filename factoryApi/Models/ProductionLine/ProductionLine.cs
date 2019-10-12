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
        public long ProdutctLineId { get; set; }

        private string Name { get; }
        private ICollection<Machine.Machine> MachinesList { get; }


        public ProductionLine(string name, ICollection<Machine.Machine> machinesList)
        {
            Name = name;
            MachinesList = machinesList;
        }

        public ProductionLineDto toDto()
        {
            ProductionLineDto productionLineDto = new ProductionLineDto();
            productionLineDto.ProdutctLineId = ProdutctLineId;
            productionLineDto.Name = Name;
            productionLineDto.MachinesList = MachinesList;
            return productionLineDto;
        }
    }
}