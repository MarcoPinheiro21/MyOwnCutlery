using Microsoft.EntityFrameworkCore.Migrations;

namespace productionApi.Migrations
{
    public partial class ExecAndSetupTimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ExecutionTime",
                table: "Operations",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "SetupTime",
                table: "Operations",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExecutionTime",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SetupTime",
                table: "Operations");
        }
    }
}
