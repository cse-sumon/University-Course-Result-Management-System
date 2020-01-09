using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IDepartmentService
    {
        IEnumerable<DepartmentViewModel> GetAllDepartments();
        DepartmentViewModel GetDepartment(int id);
        void InsertDepartment(DepartmentViewModel model);
        void UpdateDepartment(DepartmentViewModel model);
        void SoftDeleteDepartment(DepartmentViewModel model);
        void DeleteDepartment(int id);
    }
}
