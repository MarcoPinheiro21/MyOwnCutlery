using factoryApi.Context;
using factoryApi.Models.Operation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace factoryApiTest.Context
{
    public static class MasterFactoryMockContext
    {
        public static MasterFactoryContext GetMasterFactoryContextMock()
        {

                
            var options = new DbContextOptionsBuilder<MasterFactoryContext>()
                                .UseInMemoryDatabase("TestDB", new InMemoryDatabaseRoot())
                                .Options;

            MasterFactoryContext dbContext = new MasterFactoryContext(options);
            Seed(dbContext);
            
            dbContext.SaveChanges();
            
            return dbContext;
        }

        private static void Seed(MasterFactoryContext dbContext)
        {
            dbContext.Operations.Add(new Operation("op1Test", new Tool(1, "hammer")));
            dbContext.Operations.Add(new Operation("op2Test", new Tool(2, "drill")));
            dbContext.Operations.Add(new Operation("op3Test", new Tool(3, "screwdriver")));
            dbContext.Operations.Add(new Operation("op4Test", new Tool(4, "saw")));
        }
    }
}