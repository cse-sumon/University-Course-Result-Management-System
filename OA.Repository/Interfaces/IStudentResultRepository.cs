using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface IStudentResultRepository
    {
        IEnumerable<StudentResultViewModel> GetAll();
        StudentResultViewModel Get(int id);
        void Insert(StudentResultViewModel model);
        void Update(StudentResultViewModel model);
        void Delete(int id);
    }
}
