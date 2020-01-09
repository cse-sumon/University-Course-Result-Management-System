using AutoMapper;
using OA.DBModel;
using OA.Repository;
using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OA.Service.Services
{
    public class SemesterService : ISemesterService
    {
        private readonly ISemesterRepository _semesterRepository;
        public SemesterService(ISemesterRepository semesterRepository)
        {
            _semesterRepository = semesterRepository;
        }
        public IEnumerable<SemesterViewModel> GetAll()
        {
            return _semesterRepository.GetAll();

        }
    }
}
