using Microsoft.EntityFrameworkCore;
using OA.DBModel;
using OA.Repository.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OA.Repository.Repositories
{
    public class CourseAssignToTeacherRepository : ICourseAssignToTeacherRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<CourseAssignToTeacher> entities;
        public CourseAssignToTeacherRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<CourseAssignToTeacher>();
        }


        public IEnumerable<CourseAssignToTeacherViewModel> GetAll()
        {
            return (from ca in _context.CourseAssignToTeachers
                    join d in _context.Departments on ca.DepartmentId equals d.Id
                    join c in _context.Courses on ca.CourseId equals c.Id
                    join t in _context.Teachers on ca.TeacherId equals t.Id
                    join s in _context.Semesters on c.SemesterId equals s.Id
                    select new CourseAssignToTeacherViewModel
                    {
                        Id = ca.Id,
                        DepartmentId = d.Id,
                        DepartmentName = d.Name,
                        TeacherId = t.Id,
                        TeacherName = t.Name,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        Semester = s.Name,
                        CreatedAt = ca.CreatedAt
                    }).AsEnumerable().ToList();
        }

        public IEnumerable<CourseAssignToTeacherViewModel> GetAllByDepartmentId(int id)
        {
            return (from ca in _context.CourseAssignToTeachers
                    where ca.DepartmentId == id
                    join d in _context.Departments on ca.DepartmentId equals d.Id
                    join c in _context.Courses on ca.CourseId equals c.Id
                    join t in _context.Teachers on ca.TeacherId equals t.Id
                    join s in _context.Semesters on c.SemesterId equals s.Id
                    select new CourseAssignToTeacherViewModel
                    {
                        Id = ca.Id,
                        DepartmentId = d.Id,
                        DepartmentName = d.Name,
                        TeacherId = t.Id,
                        TeacherName = t.Name,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        Semester = s.Name,
                        CreatedAt = ca.CreatedAt
                    }).AsEnumerable().ToList();
        }


        public CourseAssignToTeacherViewModel Get(int id)
        {
            return (from ca in _context.CourseAssignToTeachers
                    where ca.Id == id
                    join d in _context.Departments on ca.DepartmentId equals d.Id
                    join c in _context.Courses on ca.CourseId equals c.Id
                    join t in _context.Teachers on ca.TeacherId equals t.Id
                    join s in _context.Semesters on c.SemesterId equals s.Id
                    select new CourseAssignToTeacherViewModel
                    {
                        Id = ca.Id,
                        DepartmentId = d.Id,
                        DepartmentName = d.Name,
                        TeacherId = t.Id,
                        TeacherName = t.Name,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        Semester = s.Name,
                        CreatedAt = ca.CreatedAt
                    }).SingleOrDefault();
        }


        public void Insert(CourseAssignToTeacherViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("courseAssign");
            }
            CourseAssignToTeacher courseAssign = new CourseAssignToTeacher
            {
                DepartmentId = model.DepartmentId,
                TeacherId = model.TeacherId,
                CourseId = model.CourseId,
                CreatedAt = DateTime.Now,
                ModifiedAt = null
            };
            entities.Add(courseAssign);
            _context.SaveChanges();
        }




        public void Update(CourseAssignToTeacherViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("courseAssign");
            }
            CourseAssignToTeacher courseAssign = new CourseAssignToTeacher
            {
                Id = model.Id,
                DepartmentId = model.DepartmentId,
                TeacherId = model.TeacherId,
                CourseId = model.CourseId,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now
            };
            entities.Update(courseAssign);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id! > 0)
            {
                throw new ArgumentNullException("CourseAssignToTeacher");
            }
            var courseAssign = entities.Find(id);
            entities.Remove(courseAssign);
            _context.SaveChanges();
        }

        public void Remove(CourseAssignToTeacherViewModel model)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void SoftDelete(CourseAssignToTeacherViewModel model)
        {
            throw new NotImplementedException();
        }

        public void UnAssignAllCourses()
        {
            entities.RemoveRange(entities);
            _context.SaveChanges();
        }
    }
}
