using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface IDepartmentRepository
    {
        IEnumerable<DepartmentViewModel> GetAll();
        DepartmentViewModel Get(int id);
        void Insert(DepartmentViewModel model);
        void Update(DepartmentViewModel model);
        void SoftDelete(DepartmentViewModel model);
        void Delete(DepartmentViewModel model);
        void Remove(DepartmentViewModel model);
        void SaveChanges();
    }
}
