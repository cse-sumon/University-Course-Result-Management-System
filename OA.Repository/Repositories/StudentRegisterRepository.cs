using OA.DBModel;
using OA.Repository.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace OA.Repository.Repositories
{
    public class StudentRegisterRepository : IStudentRegisterRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<StudentRegister> entities;
        public StudentRegisterRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<StudentRegister>();
        }


        public IEnumerable<StudentRegisterViewModel> GetAll()
        {
            return (from sr in _context.StudentRegisters
                    join d in _context.Departments on sr.DepartmentId equals d.Id
                    select new StudentRegisterViewModel
                    {
                        Id = sr.Id,
                        RegNo = sr.RegNo,
                        Name = sr.Name,
                        Email = sr.Email,
                        Mobile = sr.Mobile,
                        Address = sr.Address,
                        DepartmentId = d.Id,
                        DepartmentName = d.Code,
                        CreatedAt = sr.CreatedAt
                    }).AsEnumerable().ToList();
        }


        public StudentRegisterViewModel Get(int id)
        {
            return (from sr in _context.StudentRegisters
                    where sr.Id == id
                    join d in _context.Departments on sr.DepartmentId equals d.Id
                    select new StudentRegisterViewModel
                    {
                        Id = sr.Id,
                        RegNo = sr.RegNo,
                        Name = sr.Name,
                        Email = sr.Email,
                        Mobile = sr.Mobile,
                        Address = sr.Address,
                        DepartmentId = d.Id,
                        DepartmentName = d.Code,
                        CreatedAt = sr.CreatedAt
                    }).AsNoTracking().SingleOrDefault();
        }


        public int GetTotalByDepartmentId(int id)
        {
          var total = entities.Where(e => e.DepartmentId == id).Count();
            if (total <= 0)
                return 1;
            return total+1;
            
        }


        public void Insert(StudentRegisterViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("StudentRegister");
            }
            StudentRegister studentRegister = new StudentRegister
            {
                RegNo = model.RegNo,
                Name = model.Name,
                Email = model.Email,
                Mobile = model.Mobile,
                Address = model.Address,
                DepartmentId = model.DepartmentId,
                CreatedAt = model.CreatedAt,
                ModifiedAt = null
            };
            entities.Add(studentRegister);
            _context.SaveChanges();
        }




        public void Update(StudentRegisterViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("StudentRegister");
            }
            StudentRegister studentRegister = new StudentRegister
            {
                Id = model.Id,
                RegNo = model.RegNo,
                Name = model.Name,
                Email = model.Email,
                Mobile = model.Mobile,
                Address = model.Address,
                DepartmentId = model.DepartmentId,
                CreatedAt = model.CreatedAt,
                ModifiedAt = DateTime.Now
            };
            entities.Update(studentRegister);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentNullException("StudentRegister");
            }
            var studentRegister = entities.Find(id);
            _context.Remove(studentRegister);
            _context.SaveChanges();
        }

        public void Remove(StudentRegisterViewModel model)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void SoftDelete(StudentRegisterViewModel model)
        {
            throw new NotImplementedException();
        }
    }
}
