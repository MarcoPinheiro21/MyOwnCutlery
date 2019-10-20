using productionApi.DTO;
using productionApi.Models.Plan;

namespace productionApi.Models.Product
{
    public class ProductFactory
    {
        public static Product Create(string productName, CreatePlanDto plan)
        {
            var plano = PlanFactory.Create(plan.OperationList);
            return new Product(productName,plano);
        }
    }
}