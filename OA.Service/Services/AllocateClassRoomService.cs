using OA.Repository.Interfaces;
using OA.Service.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Services
{
    public class AllocateClassRoomService : IAllocateClassRoomService
    {
        private readonly IAllocateClassRoomRepository _allocateClassRoomRepository;
        public AllocateClassRoomService(IAllocateClassRoomRepository allocateClassRoomRepository)
        {
            _allocateClassRoomRepository = allocateClassRoomRepository;
        }
    

        public IEnumerable<AllocateClassRoomViewModel> GetAllAllocateClass()
        {
            return _allocateClassRoomRepository.GetAll();
        }

        public AllocateClassRoomViewModel GetAllocateClass(int id)
        {
            return _allocateClassRoomRepository.Get(id);
        }

        public void InsertAllocateClass(AllocateClassRoomViewModel model)
        {
            _allocateClassRoomRepository.Insert(model);
        }

        public void UpdateAllocateClass(AllocateClassRoomViewModel model)
        {
            _allocateClassRoomRepository.Update(model);
        }

        public void DeleteAllocateClass(int id)
        {
            _allocateClassRoomRepository.Delete(id);
        }

        public void UnAllocateAllClassRooms()
        {
            _allocateClassRoomRepository.UnAllocateAllClassRooms();
        }
    }
}
