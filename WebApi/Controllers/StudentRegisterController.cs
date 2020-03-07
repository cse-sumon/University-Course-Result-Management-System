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
    public class StudentRegisterController : ControllerBase
    {
        private readonly IStudentRegisterService _studentRegisterService;

        public StudentRegisterController(IStudentRegisterService studentRegisterService)
        {
            _studentRegisterService = studentRegisterService;
        }


        // GET: api/StudentRegister
        [HttpGet]
        public IActionResult GetAllStudentRegister()
        {
            return Ok(_studentRegisterService.GetAllStudentRegister());
        }


        // GET: api/StudentRegister/1
        [HttpGet("{id}")]
        public IActionResult GetStudentRegister(int id)
        {
            var course = _studentRegisterService.GetStudentRegister(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }



        // Post: api/StudentRegister
        [HttpPost]
        public IActionResult PostStudentRegister(StudentRegisterViewModel model)
        {
                if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _studentRegisterService.InsertStudentRegister(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/StudentRegister/5
        [HttpPut("{id}")]
        public IActionResult PutCourse(int id, StudentRegisterViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _studentRegisterService.UpdateStudentRegister(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/StudentRegister/5
        [HttpDelete("{id}")]
        public IActionResult DeleteStudentRegister(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var studentRegisterVM = _studentRegisterService.GetStudentRegister(id);
            if (studentRegisterVM == null)
            {
                return NotFound();
            }
            try
            {
                _studentRegisterService.DeleteStudentRegister(id);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}