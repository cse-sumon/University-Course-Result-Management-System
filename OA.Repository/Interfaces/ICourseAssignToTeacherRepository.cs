using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface ICourseAssignToTeacherRepository
    {
        IEnumerable<CourseAssignToTeacherViewModel> GetAll();
        CourseAssignToTeacherViewModel Get(int id);
        void Insert(CourseAssignToTeacherViewModel model);
        void Update(CourseAssignToTeacherViewModel model);
        void SoftDelete(CourseAssignToTeacherViewModel model);
        void Delete(int id);
        void UnAssignAllCourses();
        void Remove(CourseAssignToTeacherViewModel model);
        void SaveChanges();
    }
}
