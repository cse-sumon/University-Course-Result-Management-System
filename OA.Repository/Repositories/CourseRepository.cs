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
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<Course> entities;
        public CourseRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<Course>();
        }

        public IEnumerable<CourseViewModel> GetAll()
        {
              return (from c in _context.Courses
                      where c.IsDeleted == false
                      join d in _context.Departments on c.DepartmentId equals d.Id
                     join s in _context.Semesters on c.SemesterId equals s.Id
                     select new CourseViewModel
                     {
                         Id = c.Id,
                         Code = c.Code,
                         Name = c.Name,
                         Credit = c.Credit,
                         Description = c.Description,
                         DepartmentId = d.Id,
                         DepartmentName = d.Name,
                         SemesterId= s.Id,
                         SemesterName= s.Name,
                         CreatedAt = c.CreatedAt
                     }).AsEnumerable().ToList();
        }

        public CourseViewModel Get(int id)
        {
            return (from c in _context.Courses
                    where c.Id == id && c.IsDeleted == false
                    join d in _context.Departments on c.DepartmentId equals d.Id
                    join s in _context.Semesters on c.SemesterId equals s.Id
                    select new CourseViewModel
                    {
                        Id = c.Id,
                        Code = c.Code,
                        Name = c.Name,
                        Credit = c.Credit,
                        Description = c.Description,
                        DepartmentId = d.Id,
                        DepartmentName = d.Name,
                        SemesterId = s.Id,
                        SemesterName = s.Name,
                        CreatedAt = c.CreatedAt
                    }).SingleOrDefault();
        }

        public void Insert(CourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("course");
            }
            Course course = new Course
            {
                Code = model.Code,
                Name = model.Name,
                Credit = model.Credit,
                Description = model.Description,
                DepartmentId = model.DepartmentId,
                SemesterId = model.SemesterId,
                CreatedAt = DateTime.Now,
                ModifiedAt = null,
                IsDeleted = false,

            };
            entities.Add(course);
            _context.SaveChanges();
        }

        public void Update(CourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("course");
            }
            Course course = new Course
            {
                Id = model.Id,
                Code = model.Code,
                Name = model.Name,
                Credit = model.Credit,
                Description = model.Description,
                DepartmentId = model.DepartmentId,
                SemesterId = model.SemesterId,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now,
                IsDeleted = false,

            };
            entities.Update(course);
            _context.SaveChanges();
        }


        public void SoftDelete(CourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("course");
            }
            Course course = new Course
            {
                Id = model.Id,
                Code = model.Code,
                Name = model.Name,
                Credit = model.Credit,
                Description = model.Description,
                DepartmentId = model.DepartmentId,
                SemesterId = model.SemesterId,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now,
                IsDeleted = true,
            };

            entities.Update(course);
            _context.SaveChanges();
        }

        public void Delete(CourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("course");
            }

            
        }

        public void Remove(CourseViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("course");
            }
           
        }


        public void SaveChanges()
        {
            _context.SaveChanges();
        }

    }
}
