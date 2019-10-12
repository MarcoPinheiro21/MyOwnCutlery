using Microsoft.EntityFrameworkCore.Migrations;

namespace factoryApi.Migrations
{
    public partial class MasterContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_productionLines",
                table: "productionLines");

            migrationBuilder.RenameTable(
                name: "productionLines",
                newName: "ProductionLines");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Operations",
                newName: "OperationId");

            migrationBuilder.AddColumn<string>(
                name: "OperationType",
                table: "Operations",
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Tool",
                table: "Operations",
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductionLines",
                table: "ProductionLines",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductionLines",
                table: "ProductionLines");

            migrationBuilder.DropColumn(
                name: "OperationType",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "Tool",
                table: "Operations");

            migrationBuilder.RenameTable(
                name: "ProductionLines",
                newName: "productionLines");

            migrationBuilder.RenameColumn(
                name: "OperationId",
                table: "Operations",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_productionLines",
                table: "productionLines",
                column: "Id");
        }
    }
}
