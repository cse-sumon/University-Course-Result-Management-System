using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface IAllocateClassRoomRepository
    {
        IEnumerable<AllocateClassRoomViewModel> GetAll();
        IEnumerable<ClassScheduleViewModel> GetClassSchedule(int deptId);
        AllocateClassRoomViewModel Get(int id);
        void Insert(AllocateClassRoomViewModel model);
        void Update(AllocateClassRoomViewModel model);
        void SoftDelete(AllocateClassRoomViewModel model);
        void Delete(int id);

        void UnAllocateAllClassRooms();
        void Remove(AllocateClassRoomViewModel model);
        void SaveChanges();
    }
}
