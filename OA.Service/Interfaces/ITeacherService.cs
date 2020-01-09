using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface ITeacherService
    {
        IEnumerable<TeacherViewModel> GetAllTeachers();
        TeacherViewModel GetTeacher(int id);
        void InsertTeacher(TeacherViewModel model);
        void UpdateTeacher(TeacherViewModel model);
        void DeleteTeacher(int id);
        void SoftDeleteTeacher(TeacherViewModel model);
    }
}
