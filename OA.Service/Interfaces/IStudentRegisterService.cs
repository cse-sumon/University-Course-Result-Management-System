using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IStudentRegisterService
    {
        IEnumerable<StudentRegisterViewModel> GetAllStudentRegister();
        StudentRegisterViewModel GetStudentRegister(int id);
        void InsertStudentRegister(StudentRegisterViewModel model);
        void UpdateStudentRegister(StudentRegisterViewModel model);
        void SoftDeleteStudentRegister(StudentRegisterViewModel model);
        void DeleteStudentRegister(int id);
    }
}
