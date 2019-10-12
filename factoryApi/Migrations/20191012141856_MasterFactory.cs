using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace factoryApi.Migrations
{
    public partial class MasterFactory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MachineType",
                columns: table => new
                {
                    MachineTypeId = table.Column<long>(nullable: false),
                    Desc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineType", x => x.MachineTypeId);
                });

            migrationBuilder.CreateTable(
                name: "ProductionLines",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionLines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tool",
                columns: table => new
                {
                    ToolId = table.Column<long>(nullable: false),
                    Desc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool", x => x.ToolId);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: false),
                    MachineType = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Machines_MachineType_MachineType",
                        column: x => x.MachineType,
                        principalTable: "MachineType",
                        principalColumn: "MachineTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    OperationId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ToolsToolId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.OperationId);
                    table.ForeignKey(
                        name: "FK_Operations_Tool_ToolsToolId",
                        column: x => x.ToolsToolId,
                        principalTable: "Tool",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OperationMachineType",
                columns: table => new
                {
                    MachineTypeId = table.Column<long>(nullable: false),
                    OperationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationMachineType", x => new { x.OperationId, x.MachineTypeId });
                    table.ForeignKey(
                        name: "FK_OperationMachineType_MachineType_MachineTypeId",
                        column: x => x.MachineTypeId,
                        principalTable: "MachineType",
                        principalColumn: "MachineTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OperationMachineType_Operations_OperationId",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "OperationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Machines_MachineType",
                table: "Machines",
                column: "MachineType");

            migrationBuilder.CreateIndex(
                name: "IX_OperationMachineType_MachineTypeId",
                table: "OperationMachineType",
                column: "MachineTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ToolsToolId",
                table: "Operations",
                column: "ToolsToolId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "OperationMachineType");

            migrationBuilder.DropTable(
                name: "ProductionLines");

            migrationBuilder.DropTable(
                name: "MachineType");

            migrationBuilder.DropTable(
                name: "Operations");

            migrationBuilder.DropTable(
                name: "Tool");
        }
    }
}
