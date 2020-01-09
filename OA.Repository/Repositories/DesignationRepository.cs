using Microsoft.EntityFrameworkCore;
using OA.DBModel;
using OA.Repository.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OA.Repository.Repositories
{
    public class DesignationRepository : IDesignationRepository
    {
        private readonly ApplicationContext _context;
        public DbSet<Designation> entities;

        public DesignationRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<Designation>();
        }

        public IEnumerable<DesignationViewModel> GetAll()
        {
            var designations = entities.AsEnumerable();
            List<DesignationViewModel> designationVM = designations.Select(s => new DesignationViewModel
            {
                Id = s.Id,
                Name = s.Name
            }).ToList();

            return designationVM;
        }
    }
}
