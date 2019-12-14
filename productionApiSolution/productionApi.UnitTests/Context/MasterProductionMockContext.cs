using System.Collections.Generic;
using System.Reflection.PortableExecutable;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using productionApi.Context;
using productionApi.Models.Plan;
using productionApi.Models.Product;

namespace productionApiTest.Context
{
    public class MasterProductionMockContext
    {
        public static MasterProductionContext GetMasterProductionContextMock()
        {
            var options = new DbContextOptionsBuilder<MasterProductionContext>()
                .UseInMemoryDatabase("TestDB", new InMemoryDatabaseRoot())
                .Options;

            MasterProductionContext dbContext = new MasterProductionContext(null, options);
            SeedPlans(dbContext);
            SeedProducts(dbContext);

            return dbContext;
        }
        

        private static void SeedPlans(MasterProductionContext dbContext)
        {
            List<Operation> l1 = new List<Operation>();
            List<Operation> l2 = new List<Operation>();
            l1.Add(new Operation(1,"t1","type1",5,5));
            l1.Add(new Operation(2,"t2","type2",6,6));
            l2.Add(new Operation(3,"t3","type3",7,7));
            l2.Add(new Operation(4,"t4","type4",8,8));

            dbContext.Plans.Add(new Plan(l1));
            dbContext.Plans.Add(new Plan(l2));
            dbContext.SaveChanges();
        }

        private static void SeedProducts(MasterProductionContext dbContext)
        {
            var plan1 = dbContext.Plans.Find(1L);
            var plan2 = dbContext.Plans.Find(2L);
            dbContext.Products.Add(new Product("productName1", plan1));
            dbContext.Products.Add(new Product("productName2", plan2));
            dbContext.SaveChanges();
        }
    }
}