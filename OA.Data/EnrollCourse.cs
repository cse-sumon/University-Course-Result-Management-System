using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.DBModel
{
    public class EnrollCourse
    {
        public int Id { get; set; }
        [Required]
        public int StudentRegId { get; set; }
        public int CourseId { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

    }
}
