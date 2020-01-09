using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OA.Service.Interfaces;
using OA.ViewModel;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }


        // GET: api/Teacher
        [HttpGet]
        public IActionResult GetAllTeachers()
        {
            return Ok(_teacherService.GetAllTeachers());
        }


        // GET: api/Department/1
        [HttpGet("{id}")]
        public IActionResult GetTeacher(int id)
        {
            var teacher = _teacherService.GetTeacher(id);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher);
        }



        // Post: api/Teacher
        [HttpPost]
        public IActionResult PostTeacher(TeacherViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _teacherService.InsertTeacher(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/Teacher/5
        [HttpPut("{id}")]
        public IActionResult PutTeacher(int id, TeacherViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _teacherService.UpdateTeacher(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/Teacher/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var teacherVM = _teacherService.GetTeacher(id);
            if (teacherVM == null)
            {
                return NotFound();
            }
            try
            {
                _teacherService.SoftDeleteTeacher(teacherVM);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}