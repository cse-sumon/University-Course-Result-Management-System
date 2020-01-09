using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OA.DBModel;
using System;

namespace OA.Repository
{
    public class ApplicationContext : IdentityDbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Department>()
            .HasIndex(u => new { u.Code, u.Name })
            .IsUnique();

            modelBuilder.Entity<Course>()
            .HasIndex(u => new { u.Code, u.Name })
            .IsUnique();

            modelBuilder.Entity<Teacher>()
            .HasIndex(u => new { u.Email})
            .IsUnique();

            modelBuilder.Entity<CourseAssignToTeacher>()
           .HasIndex(u => new { u.CourseId })
           .IsUnique();

            modelBuilder.Entity<StudentRegister>()
           .HasIndex(u => new { u.Email })
           .IsUnique();


            modelBuilder.Entity<Semester>().HasData(
         new Semester()
         {
             Id =1,
             Name = "First",
         },
         new Semester()
         {
             Id =2,
             Name = "Second",
         },
         new Semester()
         {
             Id = 3,
             Name = "Third",
         },
         new Semester()
         {
             Id =4,
             Name = "Fourth",
         },
         new Semester()
         {
             Id =5,
             Name = "Fifth",
         },
         new Semester()
         {
             Id =6,
             Name = "Sixth",
         },
         new Semester()
         {
             Id =7,
             Name = "Seventh",
         },
         new Semester()
         {
             Id =8,
             Name = "Eighth",
         }
         );

            modelBuilder.Entity<Designation>().HasData(
        new Designation()
        {
            Id = 1,
            Name = "Professor"
        },
        new Designation
        {
            Id = 2,
            Name = "Associate Professor"
        },
         new Designation
         {
             Id = 3,
             Name = "Assistant Professor"
         },
        new Designation
        {
            Id = 4,
            Name = "Senior Lecturer"
        },
         new Designation
         {
             Id = 5,
             Name = "Lecturer"
         }
        );

            modelBuilder.Entity<Room>().HasData(
         new Room()
         {
             Id = 1,
             RoomNumner = "101"
         },
         new Room()
         {
             Id = 2,
             RoomNumner = "102"
         },
         new Room()
         {
             Id = 3,
             RoomNumner = "L-105"
         },
         new Room()
         {
             Id = 4,
             RoomNumner = "L-106"
         },
         new Room()
         {
             Id = 5,
             RoomNumner = "505"
         },
         new Room()
         {
             Id = 6,
             RoomNumner = "202"
         }
         );

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Semester> Semesters { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<CourseAssignToTeacher> CourseAssignToTeachers { get; set; }
        public DbSet<StudentRegister> StudentRegisters { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<AllocateClassRoom> AllocateClassRooms { get; set; }
        public DbSet<EnrollCourse> EnrollCourses { get; set; }
        public DbSet<StudentResult> StudentResults { get; set; }
    }
}
