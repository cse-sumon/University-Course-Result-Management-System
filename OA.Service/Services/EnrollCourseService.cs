using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Services
{
    public class EnrollCourseService : IEnrollCourseService
    {
        private readonly IEnrollCourseRepository _enrollCourseRepository;
        public EnrollCourseService(IEnrollCourseRepository enrollCourseRepository)
        {
            _enrollCourseRepository = enrollCourseRepository;
        }

        public IEnumerable<EnrollCourseViewModel> GetAllEnrollCourse()
        {
            return _enrollCourseRepository.GetAll();
        }


        public EnrollCourseViewModel GetEnrollCourse(int id)
        {
            return _enrollCourseRepository.Get(id);
        }


        public void InsertEnrollCourse(EnrollCourseViewModel model)
        {
            _enrollCourseRepository.Insert(model);
        }


        public void UpdateEnrollCourse(EnrollCourseViewModel model)
        {
            _enrollCourseRepository.Update(model);
        }

        public void DeleteEnrollCourse(int id)
        {
            _enrollCourseRepository.Delete(id);
        }
    }
}
