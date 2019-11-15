using Microsoft.EntityFrameworkCore.Migrations;

namespace factoryApi.Migrations
{
    public partial class ChangeOperationType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ExecutionTime",
                table: "OperationTypes",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "SetupTime",
                table: "OperationTypes",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExecutionTime",
                table: "OperationTypes");

            migrationBuilder.DropColumn(
                name: "SetupTime",
                table: "OperationTypes");
        }
    }
}
