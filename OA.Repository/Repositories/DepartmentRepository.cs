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
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<Department> entities;
        public DepartmentRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<Department>();
        }
        public IEnumerable<DepartmentViewModel> GetAll()
        {
            var departments = entities.Where(e=>e.IsDeleted==false).AsEnumerable();
            List<DepartmentViewModel> departmentsVm = departments.Select(x => new DepartmentViewModel
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                CreatedAt = x.CreatedAt,
            }).ToList();

            return departmentsVm;
        }


        public DepartmentViewModel Get(int id)
        {
            var department = entities.AsNoTracking().Where(e => e.Id == id && e.IsDeleted == false).SingleOrDefault();
            if (department == null)
            {
                return null;
            }
            DepartmentViewModel departmentVM = new DepartmentViewModel
            {
                Id = department.Id,
                Code = department.Code,
                Name = department.Name,
                CreatedAt = department.CreatedAt
            };
            return departmentVM;
        }


        public void Insert(DepartmentViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("department");
            }
            Department department = new Department()
            {
                Code = model.Code,
                Name = model.Name,
                CreatedAt = DateTime.Now,
                ModifiedAt = null,
                IsDeleted = false
            };
            entities.Add(department);
            _context.SaveChanges();

        }


        public void Update(DepartmentViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("department");
            }
            Department department = new Department()
            {
                Id = model.Id,
                Code = model.Code,
                Name = model.Name,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now,
                IsDeleted = false
            };
            entities.Update(department);
            _context.SaveChanges();
        }


        public void SoftDelete(DepartmentViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("department");
            }
            try
            {
                Department department = new Department
                {
                    Id = model.Id,
                    Code = model.Code,
                    Name = model.Name,
                    CreatedAt = DateTime.Now,
                    ModifiedAt = DateTime.Now,
                    IsDeleted = true
                };
                entities.Update(department);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                throw;
            }

        
           
        }

        public void Remove(DepartmentViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("department");
            }
        }

       
       
        public void Delete(DepartmentViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("department");
            }
        }


        public void SaveChanges()
        {
            _context.SaveChanges();
        }

    }
}
