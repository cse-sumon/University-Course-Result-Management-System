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
    public class EnrollCourseController : ControllerBase
    {
        private readonly IEnrollCourseService _enrollCourseService;

        public EnrollCourseController(IEnrollCourseService enrollCourseService)
        {
            _enrollCourseService = enrollCourseService;
        }


        // GET: api/AllocateClassRoom
        [HttpGet]
        public IActionResult GetAllAllocateClass()
        {
            return Ok(_enrollCourseService.GetAllEnrollCourse());
        }

        // GET: api/AllocateClassRoom
        [HttpGet("GetEnrollCourseByRegId/{id}")]
        public IActionResult GetEnrollCourseByRegId(int id)
        {
            return Ok(_enrollCourseService.GetEnrollCourseByRegId(id));
        }


        // GET: api/EnrollCourse/1
        [HttpGet("{id}")]
        public IActionResult GetAllocateClass(int id)
        {
            var enrollCourse = _enrollCourseService.GetEnrollCourse(id);
            if (enrollCourse == null)
            {
                return NotFound();
            }
            return Ok(enrollCourse);
        }



        // Post: api/EnrollCourse
        [HttpPost]
        public IActionResult PostAllocateClass(EnrollCourseViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _enrollCourseService.InsertEnrollCourse(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/EnrollCourse/5
        [HttpPut("{id}")]
        public IActionResult PutCourse(int id, EnrollCourseViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _enrollCourseService.UpdateEnrollCourse(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/EnrollCourse/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAllocateClass(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var enrollCourse = _enrollCourseService.GetEnrollCourse(id);
            if (enrollCourse == null)
            {
                return NotFound();
            }
            try
            {
                _enrollCourseService.DeleteEnrollCourse(id);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}