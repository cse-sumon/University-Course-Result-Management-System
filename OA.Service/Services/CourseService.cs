using OA.DBModel;
using OA.Repository;
using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }


        public IEnumerable<CourseViewModel> GetAllCourses()
        {
            return _courseRepository.GetAll();
        }

        public CourseViewModel GetCourse(int id)
        {
            return _courseRepository.Get(id);
        }

        public void InsertCourse(CourseViewModel model)
        {
            
            _courseRepository.Insert(model);
        }

        public void UpdateCourse(CourseViewModel model)
        {

            _courseRepository.Update(model);
        }
    

        public void DeleteCourse(int id)
        {
            //_courseRepository.SaveChanges();
        }

        public void SoftDeleteCourse(CourseViewModel model)
        {
            _courseRepository.SoftDelete(model);
        }

    }
}
