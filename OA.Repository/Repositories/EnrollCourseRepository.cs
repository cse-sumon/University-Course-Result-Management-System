using Microsoft.EntityFrameworkCore;
using OA.DBModel;
using OA.Repository.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace OA.Repository.Repositories
{
    public class EnrollCourseRepository : IEnrollCourseRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<EnrollCourse> entities;
        public EnrollCourseRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<EnrollCourse>();
        }

        public IEnumerable<EnrollCourseViewModel> GetAll()
        {
            return (from ec in _context.EnrollCourses
                    join c in _context.Courses on ec.CourseId equals c.Id
                    join r in _context.StudentRegisters on ec.StudentRegId equals r.Id
                    join d in _context.Departments on r.DepartmentId equals d.Id
                    select new EnrollCourseViewModel
                    {
                        Id = ec.Id,
                        StudentRegId = r.Id,
                        StudentRegNo = r.RegNo,
                        StudentName = r.Name,
                        StudentEmail = r.Email,
                        DepartmentCode = d.Code,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        CreatedAt = ec.CreatedAt
                    }).AsEnumerable().ToList();
        }


        public EnrollCourseViewModel Get(int id)
        {
            return (from ec in _context.EnrollCourses
                    where ec.Id == id
                    join c in _context.Courses on ec.CourseId equals c.Id
                    join r in _context.StudentRegisters on ec.StudentRegId equals r.Id
                    join d in _context.Departments on r.DepartmentId equals d.Id
                    select new EnrollCourseViewModel
                    {
                        Id = ec.Id,
                        StudentRegId = r.Id,
                        StudentRegNo = r.RegNo,
                        StudentName = r.Name,
                        StudentEmail = r.Email,
                        DepartmentCode = d.Code,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        CreatedAt = ec.CreatedAt
                    }).AsNoTracking().SingleOrDefault();
        }


        public void Insert(EnrollCourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("EnrollCourse");
            }
            EnrollCourse enrollCourse = new EnrollCourse
            {
               
                StudentRegId = model.StudentRegId,
                CourseId = model.CourseId,
                CreatedAt = model.CreatedAt
            };
            entities.Add(enrollCourse);
            _context.SaveChanges();
        }



        public void Update(EnrollCourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("EnrollCourse");
            }
            EnrollCourse enrollCourse = new EnrollCourse
            {
                Id = model.Id,
                StudentRegId = model.StudentRegId,
                CourseId = model.CourseId,
                CreatedAt = model.CreatedAt
            };
            entities.Update(enrollCourse);
            _context.SaveChanges();
        }



        public void Delete(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentNullException("EnrollCourse");
            }
            var enrollCourse = entities.Find(id);
            _context.Remove(enrollCourse);
            _context.SaveChanges();
        }
    }
}
