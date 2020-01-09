using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.DBModel
{
    public class StudentResult
    {
        public int Id { get; set; }
        [Required]
        public int StudentRegId { get; set; }
        [Required]
        public int CourseId { get; set; }
        [Required]
        public string Grade { get; set; }
    }
}
