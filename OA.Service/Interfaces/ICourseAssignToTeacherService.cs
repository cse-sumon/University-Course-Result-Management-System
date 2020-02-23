using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface ICourseAssignToTeacherService
    {
        IEnumerable<CourseAssignToTeacherViewModel> GetAllCourseAssign();
        IEnumerable<CourseAssignToTeacherViewModel> GetAllCourseAssignByDepartmentId(int id);
        CourseAssignToTeacherViewModel GetCourseAssign(int id);
        void InsertCourseAssign(CourseAssignToTeacherViewModel model);
        void UpdateCourseAssign(CourseAssignToTeacherViewModel model);
        void SoftDeleteCourseAssign(CourseAssignToTeacherViewModel model);
        void DeleteCourseAssign(int id);
        void UnAssignAllCourses();
    }
}
