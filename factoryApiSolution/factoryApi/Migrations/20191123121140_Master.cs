using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace factoryApi.Migrations
{
    public partial class Master : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MachineTypes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Desc = table.Column<string>(nullable: true),
                    VisualizationModel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OperationTypes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OperationTypeName = table.Column<string>(nullable: true),
                    ExecutionTime = table.Column<long>(nullable: false),
                    SetupTime = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductionLines",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProductionLineName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionLines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tools",
                columns: table => new
                {
                    ToolId = table.Column<long>(nullable: false),
                    Desc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tools", x => x.ToolId);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: false),
                    MachineType = table.Column<long>(nullable: true),
                    ProductionLineId = table.Column<long>(nullable: true),
                    ProductionLinePosition = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Machines_MachineTypes_MachineType",
                        column: x => x.MachineType,
                        principalTable: "MachineTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Machines_ProductionLines_ProductionLineId",
                        column: x => x.ProductionLineId,
                        principalTable: "ProductionLines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OperationTypeId = table.Column<long>(nullable: true),
                    ToolId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Operations_OperationTypes_OperationTypeId",
                        column: x => x.OperationTypeId,
                        principalTable: "OperationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Operations_Tools_ToolId",
                        column: x => x.ToolId,
                        principalTable: "Tools",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OperationMachineTypes",
                columns: table => new
                {
                    MachineTypeId = table.Column<long>(nullable: false),
                    OperationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationMachineTypes", x => new { x.OperationId, x.MachineTypeId });
                    table.ForeignKey(
                        name: "FK_OperationMachineTypes_MachineTypes_MachineTypeId",
                        column: x => x.MachineTypeId,
                        principalTable: "MachineTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OperationMachineTypes_Operations_OperationId",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Machines_Description",
                table: "Machines",
                column: "Description",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Machines_MachineType",
                table: "Machines",
                column: "MachineType");

            migrationBuilder.CreateIndex(
                name: "IX_Machines_ProductionLineId",
                table: "Machines",
                column: "ProductionLineId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineTypes_Desc",
                table: "MachineTypes",
                column: "Desc",
                unique: true,
                filter: "[Desc] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_OperationMachineTypes_MachineTypeId",
                table: "OperationMachineTypes",
                column: "MachineTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ToolId",
                table: "Operations",
                column: "ToolId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_OperationTypeId_ToolId",
                table: "Operations",
                columns: new[] { "OperationTypeId", "ToolId" },
                unique: true,
                filter: "[OperationTypeId] IS NOT NULL AND [ToolId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionLines_ProductionLineName",
                table: "ProductionLines",
                column: "ProductionLineName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "OperationMachineTypes");

            migrationBuilder.DropTable(
                name: "ProductionLines");

            migrationBuilder.DropTable(
                name: "MachineTypes");

            migrationBuilder.DropTable(
                name: "Operations");

            migrationBuilder.DropTable(
                name: "OperationTypes");

            migrationBuilder.DropTable(
                name: "Tools");
        }
    }
}
