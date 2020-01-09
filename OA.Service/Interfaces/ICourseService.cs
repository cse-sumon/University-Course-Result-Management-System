using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface ICourseService
    {
        IEnumerable<CourseViewModel> GetAllCourses();
        CourseViewModel GetCourse(int id);
        void InsertCourse(CourseViewModel model);
        void UpdateCourse(CourseViewModel model);
        void SoftDeleteCourse(CourseViewModel model);
        void DeleteCourse(int id);
    }
}
