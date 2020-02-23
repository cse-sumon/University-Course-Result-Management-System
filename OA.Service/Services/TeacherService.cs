using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _teacherRepository;

        public TeacherService(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }
        public IEnumerable<TeacherViewModel> GetAllTeachers()
        {
            return _teacherRepository.GetAll();
        }


        public TeacherViewModel GetTeacher(int id)
        {
            return _teacherRepository.Get(id);
        }

         public IEnumerable<TeacherViewModel> GetTeacherByDepartmentId(int id)
        {
            return _teacherRepository.GetByDepartmentId(id);
        }


        public void InsertTeacher(TeacherViewModel model)
        {
            _teacherRepository.Insert(model);
        }


        public void UpdateTeacher(TeacherViewModel model)
        {
            _teacherRepository.Update(model);
        }


        public void SoftDeleteTeacher(TeacherViewModel model)
        {
            _teacherRepository.SoftDelete(model);
        }


        public void DeleteTeacher(int id)
        {
            throw new NotImplementedException();
        }

       
    }
}
