using OA.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using OA.Repository;
using OA.Repository.Interfaces;
using OA.ViewModel;

namespace OA.Service.Services
{
    public class StudentRegisterService : IStudentRegisterService
    {
        private readonly IStudentRegisterRepository _studentRegisterRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public StudentRegisterService(IStudentRegisterRepository studentRegisterRepository, IDepartmentRepository departmentRepository)
        {
            _studentRegisterRepository = studentRegisterRepository;
            _departmentRepository = departmentRepository;
        }
     
        public IEnumerable<StudentRegisterViewModel> GetAllStudentRegister()
        {
            return _studentRegisterRepository.GetAll();
        }

        public StudentRegisterViewModel GetStudentRegister(int id)
        {
            return _studentRegisterRepository.Get(id);
        }

        public void InsertStudentRegister(StudentRegisterViewModel model)
        {
            var department = _departmentRepository.Get(model.DepartmentId);
            var year = DateTime.Now.Year;
            int total =_studentRegisterRepository.GetTotalByDepartmentId(model.Id);
            model.RegNo = (department.Code+"-"+ year+"-"+total).ToString();
            _studentRegisterRepository.Insert(model);
        }
        public void UpdateStudentRegister(StudentRegisterViewModel model)
        {
            _studentRegisterRepository.Update(model);
        }
        public void DeleteStudentRegister(int id)
        {
            _studentRegisterRepository.Delete(id);
        }

        public void SoftDeleteStudentRegister(StudentRegisterViewModel model)
        {
            throw new NotImplementedException();
        }

        
    }
}
