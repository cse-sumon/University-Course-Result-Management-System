using OA.DBModel;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IDesignationService
    {
        IEnumerable<DesignationViewModel> GetAll();
    }
}
