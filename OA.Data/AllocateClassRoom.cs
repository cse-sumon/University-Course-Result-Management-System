using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.DBModel
{
    public class AllocateClassRoom
    {
        public int Id { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        [Required]
        public int CourseId { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public string Day { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }

    }
}
