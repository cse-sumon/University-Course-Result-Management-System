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
                        DepartmentId = dg.Id,
                        DepartmentName = dg.Name,
                        DesignationId = dp.Id,
                        DesignationName = dp.Name,
                        CreatedAt = t.CreatedAt
                    }).AsEnumerable().ToList();
        }

        public TeacherViewModel Get(int id)
        {
            return (from t in _context.Teachers
                    where t.Id == id && t.IsDeleted == false
                    join dg in _context.Departments on t.DepartmentId equals dg.Id
                    join dp in _context.Designations on t.DepartmentId equals dp.Id
                    select new TeacherViewModel
                    {
                        Id = t.Id,
                        Name = t.Name,
                        Email = t.Email,
                        Mobile = t.Mobile,
                        Address = t.Address,
                        DepartmentId = dg.Id,
                        DepartmentName = dg.Name,
                        DesignationId = dp.Id,
                        DesignationName = dp.Name,
                        CreatedAt = t.CreatedAt
                    }).SingleOrDefault();
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
                Email = model.Name,
                Mobile = model.Mobile,
                Address = model.Address,
                DepartmentId = model.DepartmentId,
                DesignationId = model.DesignationId,
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
                Email = model.Name,
                Mobile = model.Mobile,
                Address = model.Address,
                DepartmentId = model.DepartmentId,
                DesignationId = model.DesignationId,
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
                Email = model.Name,
                Mobile = model.Mobile,
                Address = model.Address,
                DepartmentId = model.DepartmentId,
                DesignationId = model.DesignationId,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now,
                IsDeleted = true,
            };

            entities.Remove(teacher);
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
