using System.Collections.Generic;
using factoryApi.Context;
using factoryApi.Models.Machine;
using factoryApi.Models.Operation;
using factoryApi.Models.ProductionLine;
using factoryApi.Models.Relationships;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;

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
            SeedOperations(dbContext);
            SeedMachineTypes(dbContext);
            SeedOperationMachineTypes(dbContext);
            SeedMachines(dbContext);
            SeedProductionLines(dbContext);

            return dbContext;
        }

        private static void SeedProductionLines(MasterFactoryContext dbContext)
        {
            var machine1 = dbContext.Machines.Find(1L);
            var machine2 = dbContext.Machines.Find(2L);
            var machine3 = dbContext.Machines.Find(3L);
            var machinesList = new List<Machine>();
            machinesList.Add(machine1);
            machinesList.Add(machine2);

            var machinesList2 = new List<Machine>();
            machinesList2.Add(machine1);
            machinesList2.Add(machine3);
            dbContext.ProductionLines.Add(new ProductionLine("pl1Test", machinesList));
            dbContext.ProductionLines.Add(new ProductionLine("pl2Test", machinesList2));
            dbContext.SaveChanges();
        }

        private static void SeedOperations(MasterFactoryContext dbContext)
        {
            dbContext.Operations.Add(new Operation(
                new OperationType("op1Test",60,5), new Tool(1, "hammer")));
            dbContext.Operations.Add(new Operation(
                new OperationType("op2Test",30,6), new Tool(2, "drill")));
            dbContext.Operations.Add(new Operation(
                new OperationType("op3Test",40,8), new Tool(3, "screwdriver")));
            dbContext.Operations.Add(new Operation(
                new OperationType("op4Test", 40,5), new Tool(4, "saw")));
            dbContext.SaveChanges();
        }

        private static void SeedMachineTypes(MasterFactoryContext dbContext)
        {
            dbContext.MachineTypes.Add(new MachineType("machineType1"));
            dbContext.MachineTypes.Add(new MachineType("machineType2"));
            dbContext.SaveChanges();
        }

        private static void SeedOperationMachineTypes(MasterFactoryContext dbContext)
        {
            var machineType1 = dbContext.MachineTypes.Find(1L);
            var machineType2 = dbContext.MachineTypes.Find(2L);

            var operation1 = dbContext.Operations.Find(1L);
            var operation2 = dbContext.Operations.Find(2L);
            var operation3 = dbContext.Operations.Find(3L);
            var operation4 = dbContext.Operations.Find(4L);

            //Machine type 1 has op1Test and op2Test
            dbContext.OperationMachineTypes.Add(new OperationMachineType(
                machineType1.Id, machineType1,
                operation1.Id, operation1));

            dbContext.OperationMachineTypes.Add(new OperationMachineType(
                machineType1.Id, machineType1,
                operation2.Id, operation2));
            
            //Machine type 2 has op2Test, op3Test and op4Test
            dbContext.OperationMachineTypes.Add(new OperationMachineType(
                machineType2.Id, machineType2,
                operation2.Id, operation2));

            dbContext.OperationMachineTypes.Add(new OperationMachineType(
                machineType2.Id, machineType2,
                operation3.Id, operation3));

            dbContext.OperationMachineTypes.Add(new OperationMachineType(
                machineType2.Id, machineType2,
                operation4.Id, operation4));

            dbContext.SaveChanges();
        }

        private static void SeedMachines(MasterFactoryContext dbContext)
        {
            dbContext.Machines.Add(new Machine("machine1",active: true ,dbContext.MachineTypes.Find(1L)));
            dbContext.Machines.Add(new Machine("machine2",active: true , dbContext.MachineTypes.Find(2L)));
            dbContext.Machines.Add(new Machine("machine3",active: true , dbContext.MachineTypes.Find(2L)));
            dbContext.Machines.Add(new Machine("machine4",active: true , dbContext.MachineTypes.Find(2L)));
            dbContext.SaveChanges();
        }
    }
}