

namespace productionApi.DTO
{
    public class CreateProductDto
    {
        public string ProductName { get; set; }
        public CreatePlanDto Plan { get; set; }
    }
}