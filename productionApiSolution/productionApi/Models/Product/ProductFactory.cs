namespace productionApi.Models.Product
{
    public class ProductFactory
    {
        public static Product Create(string productName)
        {
            return new Product(productName);
        }
    }
}