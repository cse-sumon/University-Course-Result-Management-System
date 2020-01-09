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
    public class RoomRepository : IRoomRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<Room> entities;
        public RoomRepository(ApplicationContext context)
        {
            _context = context;
            entities = _context.Set<Room>();
        }
        public IEnumerable<RoomViewModel> GetAll()
        {
            var rooms = entities.AsEnumerable();
            List<RoomViewModel> roomVM = rooms.Select(s => new RoomViewModel
            {
                Id = s.Id,
                RoomNumber = s.RoomNumner
            }).ToList();

            return roomVM;

        }
    }
}
