using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.ViewModel
{
    public class CourseAssignToTeacherViewModel
    {
        public int Id { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        [Required]
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }

        [Required]
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public string Semester { get; set; }
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
    }
}
