using Microsoft.EntityFrameworkCore;
using OA.DBModel;
using OA.Repository.Interfaces;
using OA.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace OA.Repository.Repositories
{
    public class AllocateClassRoomRepository : IAllocateClassRoomRepository
    {
        private readonly ApplicationContext _context;
        private DbSet<AllocateClassRoom> entities;
        public AllocateClassRoomRepository(ApplicationContext context)
        {
            _context = context;
            entities = context.Set<AllocateClassRoom>();
        }
        public IEnumerable<AllocateClassRoomViewModel> GetAll()
        {
            return (from ac in _context.AllocateClassRooms
                    join d in _context.Departments on ac.DepartmentId equals d.Id
                    join c in _context.Courses on ac.CourseId equals c.Id
                    join r in _context.Rooms on ac.RoomId equals r.Id
                    select new AllocateClassRoomViewModel
                    {
                        Id = ac.Id,
                        Day = ac.Day,
                        From = ac.From,
                        To = ac.To,
                        DepartmentId = d.Id,
                        DepartmentName = d.Name,
                        RoomId = r.Id,
                        RoomNumber = r.RoomNumner,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                    }).AsEnumerable().ToList();
        }

        public AllocateClassRoomViewModel Get(int id)
        {
            return (from ac in _context.AllocateClassRooms
                    where ac.Id == id
                    join d in _context.Departments on ac.DepartmentId equals d.Id
                    join c in _context.Courses on ac.CourseId equals c.Id
                    join r in _context.Rooms on ac.RoomId equals r.Id
                    select new AllocateClassRoomViewModel
                    {
                        Id = ac.Id,
                        Day = ac.Day,
                        From = ac.From,
                        To = ac.To,
                        DepartmentId = d.Id,
                        DepartmentName = d.Name,
                        RoomId = r.Id,
                        RoomNumber = r.RoomNumner,
                        CourseId = c.Id,
                        CourseCode = c.Code,
                        CourseName = c.Name,
                    }).SingleOrDefault();
        }


        public void Insert(AllocateClassRoomViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("AllocateClassRoom");
            }
            AllocateClassRoom classRoom = new AllocateClassRoom
            {
                DepartmentId = model.DepartmentId,
                RoomId = model.RoomId,
                CourseId = model.CourseId,
                Day = model.Day,
                From = model.From,
                To = model.To
            };
            entities.Add(classRoom);
            _context.SaveChanges();

        }

        public void Update(AllocateClassRoomViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("AllocateClassRoom");
            }
            AllocateClassRoom classRoom = new AllocateClassRoom
            {
                Id = model.Id,
                DepartmentId = model.DepartmentId,
                RoomId = model.RoomId,
                CourseId = model.CourseId,
                Day = model.Day,
                From = model.From,
                To = model.To
            };
            entities.Update(classRoom);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id !> 0)
            {
                throw new ArgumentNullException("AllocateClassRoom");
            }
            var allocateClass = entities.Find(id);
            entities.Remove(allocateClass);
            _context.SaveChanges();
        }
        public void Remove(AllocateClassRoomViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("AllocateClassRoom");
            }
                
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void SoftDelete(AllocateClassRoomViewModel model)
        {
            throw new NotImplementedException();
        }

        public void UnAllocateAllClassRooms()
        {
            entities.RemoveRange(entities);
            _context.SaveChanges();
        }
    }
}
