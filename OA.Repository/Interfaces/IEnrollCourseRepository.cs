using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface IEnrollCourseRepository
    {
        IEnumerable<EnrollCourseViewModel> GetAll();
        EnrollCourseViewModel Get(int id);
        void Insert(EnrollCourseViewModel model);
        void Update(EnrollCourseViewModel model);
        void Delete(int id);
    }
}
