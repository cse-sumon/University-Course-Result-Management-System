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
    public class StudentResultController : ControllerBase
    {
        private readonly IStudentResultService _studentResultService;

        public StudentResultController(IStudentResultService studentResultService)
        {
            _studentResultService = studentResultService;
        }


        // GET: api/StudentResult
        [HttpGet]
        public IActionResult GetAllStudentResult()
        {
            return Ok(_studentResultService.GetAllStudentResults());
        }


        // GET: api/StudentResult/1
        [HttpGet("{id}")]
        public IActionResult GetStudentResult(int id)
        {
            var course = _studentResultService.GetStudentResult(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }



        // Post: api/StudentResult
        [HttpPost]
        public IActionResult PostStudentResult(StudentResultViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _studentResultService.InsertStudentResult(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/StudentResult/5
        [HttpPut("{id}")]
        public IActionResult PutCourse(int id, StudentResultViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _studentResultService.UpdateStudentResult(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/StudentResult/5
        [HttpDelete("{id}")]
        public IActionResult DeleteStudentResult(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var courseVM = _studentResultService.GetStudentResult(id);
            if (courseVM == null)
            {
                return NotFound();
            }
            try
            {
                _studentResultService.DeleteStudentResult(id);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}