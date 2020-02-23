using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface ITeacherRepository
    {
        IEnumerable<TeacherViewModel> GetAll();
        TeacherViewModel Get(int id);
        IEnumerable<TeacherViewModel> GetByDepartmentId(int id);
        void Insert(TeacherViewModel model);
        void Update(TeacherViewModel model);
        void Delete(TeacherViewModel model);
        void SoftDelete(TeacherViewModel model);
        void Remove(TeacherViewModel model);
        void SaveChanges();
    }
}
