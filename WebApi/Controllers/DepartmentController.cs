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
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }


        // GET: api/Department
        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            return Ok(_departmentService.GetAllDepartments());
        }


        // GET: api/Department/1
        [HttpGet("{id}")]
        public IActionResult GetDepartment(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var department = _departmentService.GetDepartment(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }



        // Post: api/Department
        [HttpPost]
        public IActionResult PostDepartment(DepartmentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            try
            {
                _departmentService.InsertDepartment(model);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // PUT: api/Department/5
        [HttpPut("{id}")]
        public IActionResult PutDepartment(int id, DepartmentViewModel model)
        {
            if (id != model.Id || !ModelState.IsValid)
            {
                return BadRequest(model);
            }

            try
            {
                _departmentService.UpdateDepartment(model);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        // Delete: api/Department/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var departmentVM = _departmentService.GetDepartment(id);
            if (departmentVM == null)
            {
                return NotFound();
            }
            try
            {
                _departmentService.SoftDeleteDepartment(departmentVM);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}