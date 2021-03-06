﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.ViewModel
{
    public class EnrollCourseViewModel
    {
        public int Id { get; set; }
        [Required]
        public int StudentRegId { get; set; }
        public string StudentRegNo { get; set; }
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public string DepartmentCode { get; set; }
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
    }
}
