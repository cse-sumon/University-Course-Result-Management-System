using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OA.Repository.Migrations
{
    public partial class AllocateClassRoomEnrollCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RegNo",
                table: "StudentRegisters",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "AllocateClassRooms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartmentId = table.Column<int>(nullable: false),
                    CourseId = table.Column<int>(nullable: false),
                    RoomId = table.Column<int>(nullable: false),
                    Day = table.Column<string>(nullable: false),
                    From = table.Column<DateTime>(nullable: false),
                    To = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocateClassRooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnrollCourses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentRegId = table.Column<int>(nullable: false),
                    CourseId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollCourses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoomNumner = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "RoomNumner" },
                values: new object[,]
                {
                    { 1, "101" },
                    { 2, "102" },
                    { 3, "L-105" },
                    { 4, "L-106" },
                    { 5, "505" },
                    { 6, "202" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllocateClassRooms");

            migrationBuilder.DropTable(
                name: "EnrollCourses");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropColumn(
                name: "RegNo",
                table: "StudentRegisters");
        }
    }
}
