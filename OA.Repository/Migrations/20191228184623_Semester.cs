using Microsoft.EntityFrameworkCore.Migrations;

namespace OA.Repository.Migrations
{
    public partial class Semester : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Designation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Semesters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semesters", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Designation",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Professor" },
                    { 2, "Associate Professor" },
                    { 3, "Assistant Professor" },
                    { 4, "Senior Lecturer" },
                    { 5, "Lecturer" }
                });

            migrationBuilder.InsertData(
                table: "Semesters",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "First" },
                    { 2, "Second" },
                    { 3, "Third" },
                    { 4, "Fourth" },
                    { 5, "Fifth" },
                    { 6, "Sixth" },
                    { 7, "Seventh" },
                    { 8, "Eighth" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Designation");

            migrationBuilder.DropTable(
                name: "Semesters");
        }
    }
}
