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
    public class CourseAssignToTeacherController : ControllerBase
    {
        private readonly ICourseAssignToTeacherService _courseAssignToTeacherService;

        public CourseAssignToTeacherController(ICourseAssignToTeacherService courseAssignToTeacherService)
        {
            _courseAssignToTeacherService = courseAssignToTeacherService;
        }


        // GET: api/CourseAssignToTeacher
        [HttpGet]
        public IActionResult GetAllCourseAssign()
        {
            return Ok(_courseAssignToTeacherService.GetAllCourseAssign());
        }


        // GET: api/CourseAssignToTeacher/GetAllCourseAssignByDepartmentId/1
        [HttpGet("GetAllCourseAssignByDepartmentId/{id}")]
        public IActionResult GetAllCourseAssignByDepartmentId(int id)
        {
            return Ok(_courseAssignToTeacherService.GetAllCourseAssignByDepartmentId(id));
        }

        // GET: api/CourseAssignToTeacher/1
        [HttpGet("{id}")]
        public IActionResult GetCourseAssign(int id)
        {
            var course = _courseAssignToTeacherService.GetCourseAssign(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }



        // Post: api/CourseAssignToTeacher
        [HttpPost]
        public IActionResult PostCourseAssign(CourseAssignToTeacherViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _courseAssignToTeacherService.InsertCourseAssign(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/CourseAssignToTeacher/5
        [HttpPut("{id}")]
        public IActionResult PutCourse(int id, CourseAssignToTeacherViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _courseAssignToTeacherService.UpdateCourseAssign(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/CourseAssignToTeacher/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCourseAssign(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var courseVM = _courseAssignToTeacherService.GetCourseAssign(id);
            if (courseVM == null)
            {
                return NotFound();
            }
            try
            {
                _courseAssignToTeacherService.DeleteCourseAssign(id);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }


        // Get: api/CourseAssignToTeacher/UnAssignAllCourse
        [HttpGet]
        [Route("UnAssignAllCourse")]
        public IActionResult UnAssignAllCourse()
        {
            try
            {
                _courseAssignToTeacherService.UnAssignAllCourses();
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}