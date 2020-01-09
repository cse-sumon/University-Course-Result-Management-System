using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IEnrollCourseService
    {
        IEnumerable<EnrollCourseViewModel> GetAllEnrollCourse();
        EnrollCourseViewModel GetEnrollCourse(int id);
        void InsertEnrollCourse(EnrollCourseViewModel model);
        void UpdateEnrollCourse(EnrollCourseViewModel model);
        void DeleteEnrollCourse(int id);
    }
}
