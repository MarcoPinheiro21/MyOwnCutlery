using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using factoryApi.DTO;
using factoryApi.Models.Relationships;

namespace factoryApi.Models.Machine
{
    public class MachineType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long MachineTypeId { get; set; }

        public string Desc { get; set; }
        [ForeignKey("OperationId")] 
        public virtual ICollection<OperationMachineType> OperationMachineType { get; set; }

        public MachineType(string desc)
        {
            if (null == desc || desc.Trim().Length == 0)
            {
                throw new ArgumentNullException("Invalid machine type description.");
            }
            
            Desc = desc;
            OperationMachineType = new List<OperationMachineType>();
        }
        
        public MachineTypeDto toDto()
        {
            return new MachineTypeDto(MachineTypeId, Desc, GetOperationIdsList());
        }

        private ICollection<string> GetOperationIdsList()
        {
            return OperationMachineType.Select(var => var.Operation.OperationName).ToList();
        }
    }
}