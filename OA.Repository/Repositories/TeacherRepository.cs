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
    public class TeacherRepository : ITeacherRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<Teacher> entities;
        public TeacherRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<Teacher>();
        }

        public IEnumerable<TeacherViewModel> GetAll()
        {
            return (from t in _context.Teachers
                    where t.IsDeleted == false
                    join dp in _context.Departments on t.DepartmentId equals dp.Id
                    join dg in _context.Designations on t.DepartmentId equals dg.Id
                    select new TeacherViewModel
                    {
                        Id = t.Id,
                        Name = t.Name,
                        Email = t.Email,
                        Mobile = t.Mobile,
                        Address = t.Address,
                        DepartmentId = dp.Id,
                        DepartmentCode = dp.Code,
                        DesignationId = dg.Id,
                        DesignationName = dg.Name,
                        TotalCredit = t.TotalCredit,
                        CreatedAt = t.CreatedAt
                    }).AsEnumerable().ToList();
        }

        public TeacherViewModel Get(int id)
        {
            return (from t in _context.Teachers.AsNoTracking()
                    where t.Id == id && t.IsDeleted == false
                    join dp in _context.Departments on t.DepartmentId equals dp.Id
                    join dg in _context.Designations on t.DepartmentId equals dg.Id
                    select new TeacherViewModel
                    {
                        Id = t.Id,
                        Name = t.Name,
                        Email = t.Email,
                        Mobile = t.Mobile,
                        Address = t.Address,
                        DepartmentId = dp.Id,
                        DepartmentCode = dp.Code,
                        DesignationId = dg.Id,
                        DesignationName = dg.Name,
                        TotalCredit = t.TotalCredit,
                        CreatedAt = t.CreatedAt
                    }).SingleOrDefault();
        }   
        
        
        public IEnumerable<TeacherViewModel> GetByDepartmentId(int id)
        {
            return (from t in _context.Teachers.AsNoTracking()
                    where t.DepartmentId == id && t.IsDeleted == false
                    select new TeacherViewModel
                    {
                        Id = t.Id,
                        Name = t.Name,
                    }).AsEnumerable().ToList();
        }



        public void Insert(TeacherViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("teacher");
            }
            Teacher teacher = new Teacher
            {
                Name = model.Name,
                Email = model.Email,
                Mobile = model.Mobile,
                Address = model.Address,
                DesignationId = model.DesignationId,
                DepartmentId = model.DepartmentId,
                TotalCredit = model.TotalCredit,
                CreatedAt = DateTime.Now,
                ModifiedAt = null,
                IsDeleted = false,
            };

            entities.Add(teacher);
            _context.SaveChanges();
        }



        public void Update(TeacherViewModel model)
        {
            Teacher teacher = new Teacher
            {
                Id = model.Id,
                Name = model.Name,
                Email = model.Email,
                Mobile = model.Mobile,
                Address = model.Address,
                DesignationId = model.DesignationId,
                DepartmentId = model.DepartmentId,
                TotalCredit = model.TotalCredit,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now,
                IsDeleted = false,
            };

            entities.Update(teacher);
            _context.SaveChanges();
        }


        public void Delete(TeacherViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("teacher");
            }
          

        }

        public void SoftDelete(TeacherViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("teacher");
            }
            Teacher teacher = new Teacher
            {
                Id = model.Id,
                Name = model.Name,
                Email = model.Email,
                Mobile = model.Mobile,
                Address = model.Address,
                DesignationId = model.DesignationId,
                DepartmentId = model.DepartmentId,
                TotalCredit = model.TotalCredit,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now,
                IsDeleted = true,
            };

            entities.Update(teacher);
            _context.SaveChanges();
        }


        public void Remove(TeacherViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("teacher");
            }
            
        }


        public void SaveChanges()
        {
            _context.SaveChanges();
        }

    }
}
