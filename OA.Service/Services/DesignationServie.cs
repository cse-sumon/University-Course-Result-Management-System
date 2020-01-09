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
    public class DesignationService : IDesignationService
    {
        private IDesignationRepository _designationRepository;
        public DesignationService(IDesignationRepository designationRepository)
        {
            _designationRepository = designationRepository;
        }
        public IEnumerable<DesignationViewModel> GetAll()
        {
            return _designationRepository.GetAll();
        }
    }
}
