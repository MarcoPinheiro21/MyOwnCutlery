﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using factoryApi.Models;

namespace factoryApi.Migrations
{
    [DbContext(typeof(Context.MasterFactoryContext))]
    partial class MasterFactoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("factoryApi.Models.Machine.Machine", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<long?>("MachineType");

                    b.HasKey("Id");

                    b.HasIndex("MachineType");

                    b.ToTable("Machines");
                });

            modelBuilder.Entity("factoryApi.Models.Machine.MachineType", b =>
                {
                    b.Property<long>("MachineTypeId");

                    b.Property<string>("Desc");

                    b.HasKey("MachineTypeId");

                    b.ToTable("MachineType");
                });

            modelBuilder.Entity("factoryApi.Models.Operation.Operation", b =>
                {
                    b.Property<long>("OperationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("ToolsToolId");

                    b.HasKey("OperationId");

                    b.HasIndex("ToolsToolId");

                    b.ToTable("Operations");
                });

            modelBuilder.Entity("factoryApi.Models.Operation.Tool", b =>
                {
                    b.Property<long>("ToolId");

                    b.Property<string>("Desc");

                    b.HasKey("ToolId");

                    b.ToTable("Tool");
                });

            modelBuilder.Entity("factoryApi.Models.ProductionLine.ProductionLine", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("ProductionLines");
                });

            modelBuilder.Entity("factoryApi.Models.Relationships.OperationMachineType", b =>
                {
                    b.Property<long>("OperationId");

                    b.Property<long>("MachineTypeId");

                    b.HasKey("OperationId", "MachineTypeId");

                    b.HasIndex("MachineTypeId");

                    b.ToTable("OperationMachineType");
                });

            modelBuilder.Entity("factoryApi.Models.Machine.Machine", b =>
                {
                    b.HasOne("factoryApi.Models.Machine.MachineType", "Type")
                        .WithMany()
                        .HasForeignKey("MachineType");
                });

            modelBuilder.Entity("factoryApi.Models.Operation.Operation", b =>
                {
                    b.HasOne("factoryApi.Models.Operation.Tool", "Tools")
                        .WithMany()
                        .HasForeignKey("ToolsToolId");
                });

            modelBuilder.Entity("factoryApi.Models.Relationships.OperationMachineType", b =>
                {
                    b.HasOne("factoryApi.Models.Machine.MachineType", "MachineType")
                        .WithMany("OperationMachineType")
                        .HasForeignKey("MachineTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("factoryApi.Models.Operation.Operation", "Operation")
                        .WithMany("OperationMachineType")
                        .HasForeignKey("OperationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}