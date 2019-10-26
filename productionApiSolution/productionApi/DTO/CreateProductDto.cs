

namespace productionApi.DTO
{
    public class CreateProductDto
    {
        public string ProductName { get; set; }
        public CreatePlanDto Plan { get; set; }

        public CreateProductDto(string name, CreatePlanDto plan)
        {
            this.ProductName = name;
            this.Plan = plan;
        }
    }
}