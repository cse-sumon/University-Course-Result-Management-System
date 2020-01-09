using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Services
{
    public class StudentResultService : IStudentResultService
    {
        private readonly IStudentResultRepository _studentResultRepository;
        public StudentResultService(IStudentResultRepository studentResultRepository)
        {
            _studentResultRepository = studentResultRepository;
        }
     
        public IEnumerable<StudentResultViewModel> GetAllStudentResults()
        {
            return _studentResultRepository.GetAll();
        }

        public StudentResultViewModel GetStudentResult(int id)
        {
            return _studentResultRepository.Get(id);
        }

        public void InsertStudentResult(StudentResultViewModel model)
        {
            _studentResultRepository.Insert(model);
        }

        public void UpdateStudentResult(StudentResultViewModel model)
        {
            _studentResultRepository.Update(model);
        }

        public void DeleteStudentResult(int id)
        {
            _studentResultRepository.Delete(id);
        }

    }
}
