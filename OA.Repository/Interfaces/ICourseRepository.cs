using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface ICourseRepository
    {
        IEnumerable<CourseViewModel> GetAll();
        CourseViewModel Get(int id);
        void Insert(CourseViewModel model);
        void Update(CourseViewModel model);
        void SoftDelete(CourseViewModel model);
        void Delete(CourseViewModel model);
        void Remove(CourseViewModel model);
        void SaveChanges();
    }
}
