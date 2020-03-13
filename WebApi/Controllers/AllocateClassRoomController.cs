using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OA.Service.Interfaces;
using OA.ViewModel;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AllocateClassRoomController : ControllerBase
    {
        private readonly IAllocateClassRoomService _allocateClassRoomService;

        public AllocateClassRoomController(IAllocateClassRoomService allocateClassRoomService)
        {
            _allocateClassRoomService = allocateClassRoomService;
        }


        // GET: api/AllocateClassRoom
        [HttpGet]
        public IActionResult GetAllAllocateClass()
        {
            return Ok(_allocateClassRoomService.GetAllAllocateClass());
        }


        // GET: api/AllocateClassRoom/GetClassScheduleByDepartmentId/1
        [HttpGet("GetClassScheduleByDepartmentId/{deptId}")]
        public IActionResult GetClassScheduleByDepartmentId(int deptId)
        {
            return Ok(_allocateClassRoomService.GetClassSchedule(deptId));
        }


        // GET: api/AllocateClassRoom/1
        [HttpGet("{id}")]
        public IActionResult GetAllocateClass(int id)
        {
            var course = _allocateClassRoomService.GetAllocateClass(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }



        // Post: api/AllocateClassRoom
        [HttpPost]
        public IActionResult PostAllocateClass(AllocateClassRoomViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _allocateClassRoomService.InsertAllocateClass(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/AllocateClassRoom/5
        [HttpPut("{id}")]
        public IActionResult PutCourse(int id, AllocateClassRoomViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _allocateClassRoomService.UpdateAllocateClass(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/AllocateClassRoom/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAllocateClass(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var courseVM = _allocateClassRoomService.GetAllocateClass(id);
            if (courseVM == null)
            {
                return NotFound();
            }
            try
            {
                _allocateClassRoomService.DeleteAllocateClass(id);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }


        //Get: api/AllocateClassRoom/UnAllocateAllClassRoom
        [HttpGet]
        [Route("UnAllocateAllClassRoom")]
        public IActionResult UnAllocateAllClassRoom()
        {
            try
            {
                _allocateClassRoomService.UnAllocateAllClassRooms();
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}