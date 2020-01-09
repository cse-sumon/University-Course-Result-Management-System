﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.ViewModel
{
    public class AllocateClassRoomViewModel
    {
        public int Id { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        [Required]
        public int CourseId { get; set; }
        
        public string CourseName { get; set; }
        public string CourseCode { get; set; }
        [Required]
        public int RoomId { get; set; }
        public string RoomNumber { get; set; }
        [Required]
        public string Day { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }
    }
}
