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
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }


        // GET: api/Course
        [HttpGet]
        public IActionResult GetAllCourses()
        {
            return Ok(_courseService.GetAllCourses());
        }


        // GET: api/Course/1
        [HttpGet("{id}")]
        public IActionResult GetCourse(int id)
        {
            var course = _courseService.GetCourse(id);
            if (course==null)
            {
                return NotFound();
            }
            return Ok(course);
        }



        // Post: api/Course
        [HttpPost]
        public IActionResult PostCourse(CourseViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _courseService.InsertCourse(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/Course/5
        [HttpPut("{id}")]
        public IActionResult PutCourse(int id, CourseViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _courseService.UpdateCourse(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/Course/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var courseVM = _courseService.GetCourse(id);
            if (courseVM == null)
            {
                return NotFound();
            }
            try
            {
                _courseService.SoftDeleteCourse(courseVM);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}