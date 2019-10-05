using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace factoryApi.Models.ProductionLine
{
    public class ProductionLine
    {
//        public ProductionLine(string name, ICollection<Machine.Machine> machines)
//        {
//            Name = name;
//            Machines = machines;
//        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long Id { get; set; }
        private string Name { get; }
        private ICollection<Machine.Machine> Machines { get; }
    }
}