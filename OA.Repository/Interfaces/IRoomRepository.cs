using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Repository.Interfaces
{
    public interface IRoomRepository
    {
        IEnumerable<RoomViewModel> GetAll();
    }
}
