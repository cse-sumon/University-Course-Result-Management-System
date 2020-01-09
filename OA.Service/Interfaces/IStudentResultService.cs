using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IStudentResultService
    {
        IEnumerable<StudentResultViewModel> GetAllStudentResults();
        StudentResultViewModel GetStudentResult(int id);
        void InsertStudentResult(StudentResultViewModel model);
        void UpdateStudentResult(StudentResultViewModel model);
        void DeleteStudentResult(int id);
    }
}
