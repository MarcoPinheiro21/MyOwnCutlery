using factoryApi.Context;
using factoryApi.Models.Operation;
using Microsoft.EntityFrameworkCore;

namespace factoryApiTest.Context
{
    public static class MasterFactoryMockContext
    {
        public static MasterFactoryContext GetMasterFactoryContextMock()
        {

                
            var options = new DbContextOptionsBuilder<MasterFactoryContext>()
                                .UseInMemoryDatabase()
                                .Options;

            MasterFactoryContext dbContext = new MasterFactoryContext(options);
            Seed(dbContext);
            
            dbContext.SaveChanges();
            
            return dbContext;
        }

        private static void Seed(MasterFactoryContext dbContext)
        {
            dbContext.Operations.Add(new Operation("op1Test", new Tool(1, "hammer")));
            dbContext.SaveChanges();
        }
    }
}