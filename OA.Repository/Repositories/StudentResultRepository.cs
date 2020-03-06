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
    public class StudentResultRepository : IStudentResultRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<StudentResult> entities;
        public StudentResultRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<StudentResult>();
        }

        public IEnumerable<StudentResultViewModel> GetAll()
        {
            return (from sr in _context.StudentResults
                    join c in _context.Courses on sr.CourseId equals c.Id
                    join srg in _context.StudentRegisters on sr.StudentRegId equals srg.Id
                    join d in _context.Departments on srg.DepartmentId equals d.Id
                    select new StudentResultViewModel
                    {
                        Id = sr.Id,
                        StudentRegId = sr.StudentRegId,
                        StudentRegNo = srg.RegNo,
                        StudentName = srg.Name,
                        StudentEmail = srg.Email,
                        DepartmentCode = d.Code,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        Grade = sr.Grade,
                    }).AsEnumerable().ToList();
        }   
        
        public IEnumerable<StudentResultViewModel> GetByRegId(int id)
        {
            return (from sr in _context.StudentResults
                    where sr.StudentRegId==id
                    join c in _context.Courses on sr.CourseId equals c.Id
                    join srg in _context.StudentRegisters on sr.StudentRegId equals srg.Id
                    join d in _context.Departments on srg.DepartmentId equals d.Id
                    select new StudentResultViewModel
                    {
                        Id = sr.Id,
                        StudentRegId = sr.StudentRegId,
                        StudentRegNo = srg.RegNo,
                        StudentName = srg.Name,
                        StudentEmail = srg.Email,
                        DepartmentCode = d.Code,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        Grade = sr.Grade,
                    }).AsEnumerable().ToList();
        }


        public IEnumerable<StudentResultViewModel> GetAllRegNo()
        {
            return (from sr in _context.StudentResults
                    join srg in _context.StudentRegisters on sr.StudentRegId equals srg.Id
                    select new StudentResultViewModel
                    {
                        StudentRegId = sr.StudentRegId,
                        StudentRegNo = srg.RegNo,
                    }).Distinct().AsEnumerable().ToList();
        }


        public StudentResultViewModel Get(int id)
        {
            return (from sr in _context.StudentResults
                    where sr.Id == id
                    join c in _context.Courses on sr.CourseId equals c.Id
                    join srg in _context.StudentRegisters on sr.StudentRegId equals srg.Id
                    join d in _context.Departments on srg.DepartmentId equals d.Id
                    select new StudentResultViewModel
                    {
                        Id = sr.Id,
                        StudentRegId = sr.StudentRegId,
                        StudentRegNo = srg.RegNo,
                        StudentName = srg.Name,
                        StudentEmail = srg.Email,
                        DepartmentCode = d.Code,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                        Grade = sr.Grade,
                    }).AsNoTracking().SingleOrDefault();
        }



        public void Insert(StudentResultViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("StudentResult");
            }
            StudentResult studentResult = new StudentResult
            {

                StudentRegId = model.StudentRegId,
                CourseId = model.CourseId,
                Grade = model.Grade
            };
             entities.Add(studentResult);
            _context.SaveChanges();

        }


        public void Update(StudentResultViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("StudentResult");
            }
            StudentResult studentResult = new StudentResult
            {
                Id = model.Id,
                StudentRegId = model.StudentRegId,
                CourseId = model.CourseId,
                Grade = model.Grade
            };
            entities.Update(studentResult);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentNullException("StudentResult");
            }
            var studentResult = entities.Find(id);
            entities.Remove(studentResult);
            _context.SaveChanges();
        }
    }
}
