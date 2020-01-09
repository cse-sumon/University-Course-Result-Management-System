using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.DBModel
{
    public class CourseAssignToTeacher
    {
        public int Id { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        [Required]
        public int TeacherId { get; set; }
        [Required]
        public int CourseId { get; set; }

        public DateTime CreatedAt { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
    }
}
