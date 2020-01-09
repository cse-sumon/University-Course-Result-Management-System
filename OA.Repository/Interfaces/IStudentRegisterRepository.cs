using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface IStudentRegisterRepository
    {
        IEnumerable<StudentRegisterViewModel> GetAll();
        StudentRegisterViewModel Get(int id);
        int GetTotalByDepartmentId(int id);
        void Insert(StudentRegisterViewModel model);
        void Update(StudentRegisterViewModel model);
        void SoftDelete(StudentRegisterViewModel model);
        void Delete(int id);
        void Remove(StudentRegisterViewModel model);
        void SaveChanges();
    }
}
