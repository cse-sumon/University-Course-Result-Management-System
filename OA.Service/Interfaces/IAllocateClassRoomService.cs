using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IAllocateClassRoomService
    {
        IEnumerable<AllocateClassRoomViewModel> GetAllAllocateClass();
        IEnumerable<ClassScheduleViewModel> GetClassSchedule(int deptId);
        AllocateClassRoomViewModel GetAllocateClass(int id);
        void InsertAllocateClass(AllocateClassRoomViewModel model);
        void UpdateAllocateClass(AllocateClassRoomViewModel model);
        void DeleteAllocateClass(int id);
        void UnAllocateAllClassRooms();
    }

}
