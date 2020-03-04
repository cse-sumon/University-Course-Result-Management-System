using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Service.Interfaces
{
    public interface IRoomService
    {
        IEnumerable<RoomViewModel> GetAllRoom();
    }
}
