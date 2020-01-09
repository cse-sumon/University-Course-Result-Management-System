using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Services
{
    public class CourseAssignToTeacherService : ICourseAssignToTeacherService
    {
        private readonly ICourseAssignToTeacherRepository _courseAssignToTeacherRepository;
        public CourseAssignToTeacherService(ICourseAssignToTeacherRepository courseAssignToTeacherRepository)
        {
            _courseAssignToTeacherRepository = courseAssignToTeacherRepository;
        }


        public IEnumerable<CourseAssignToTeacherViewModel> GetAllCourseAssign()
        {
            return _courseAssignToTeacherRepository.GetAll();
        }

        public CourseAssignToTeacherViewModel GetCourseAssign(int id)
        {
            return _courseAssignToTeacherRepository.Get(id);
        }

        public void InsertCourseAssign(CourseAssignToTeacherViewModel model)
        {

            _courseAssignToTeacherRepository.Insert(model);
        }

        public void UpdateCourseAssign(CourseAssignToTeacherViewModel model)
        {

            _courseAssignToTeacherRepository.Update(model);
        }


        public void DeleteCourseAssign(int id)
        {
            _courseAssignToTeacherRepository.Delete(id);
        }

        public void SoftDeleteCourseAssign(CourseAssignToTeacherViewModel model)
        {
            _courseAssignToTeacherRepository.SoftDelete(model);
        }

        public void UnAssignAllCourses()
        {
            _courseAssignToTeacherRepository.UnAssignAllCourses();
        }
    }
}
