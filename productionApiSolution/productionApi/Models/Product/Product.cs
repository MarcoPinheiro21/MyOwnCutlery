using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using productionApi.DTO;
using productionApi.Models.Plan;



namespace productionApi.Models.Product
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long ProductId { get; set; }

        public string ProductName { get; set; }

        [ForeignKey("PlanId")]
        public Plan.Plan Plan { get; set; }

        public Product(string productName, Plan.Plan plan)
        {
            this.ProductName = (productName == null || productName.Equals(""))
                ? throw new ArgumentNullException("Name cannot be null or empty!")
                : productName;
            this.Plan = plan;
        }

        protected Product()
        {
        }

        public ProductDto toDto()
        {
            ProductDto productDto = new ProductDto();
            productDto.ProductId = this.ProductId;
            productDto.ProductName = this.ProductName;
            productDto.PlanId = this.Plan.PlanId;
            return productDto;
        }
    }
}
