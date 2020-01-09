using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.ViewModel
{
    public class StudentResultViewModel
    {
        public int Id { get; set; }
        [Required]
        public int StudentRegId { get; set; }
        public string StudentRegNo { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string DepartmentName { get; set; }
        [Required]
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        [Required]
        public string Grade { get; set; }
    }
}
