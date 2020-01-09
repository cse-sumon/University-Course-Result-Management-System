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
    public class SemesterRepository : ISemesterRepository
    {
        private readonly ApplicationContext _context;
        public DbSet<Semester> entities;
        public SemesterRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<Semester>();
        }
        public IEnumerable<SemesterViewModel> GetAll()
        {
            var semesters = entities.AsEnumerable();
            List<SemesterViewModel> semesterVM = semesters.Select(s => new SemesterViewModel
            {
                Id = s.Id,
                Name = s.Name
            }).ToList();

            return semesterVM;
        }
    }
}
