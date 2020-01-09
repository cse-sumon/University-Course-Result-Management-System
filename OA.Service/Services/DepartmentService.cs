using OA.DBModel;
using OA.Repository;
using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OA.Service.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }


        public IEnumerable<DepartmentViewModel> GetAllDepartments()
        {
            return _departmentRepository.GetAll();
        }



        public DepartmentViewModel GetDepartment(int id)
        {
            return _departmentRepository.Get(id);
           
        }



        public void InsertDepartment(DepartmentViewModel model)
        {        
            _departmentRepository.Insert(model);
        }



        public void UpdateDepartment(DepartmentViewModel model)
        {
            _departmentRepository.Update(model);
        }



        public void DeleteDepartment(int id)
        {
           //
        }


        public void SoftDeleteDepartment(DepartmentViewModel model)
        {
            _departmentRepository.Update(model);
        }

    }
}
