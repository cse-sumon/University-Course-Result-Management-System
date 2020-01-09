using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.ViewModel
{
    public class CourseViewModel
    {
        public int Id { get; set; }

        [Required]
        [MinLength(5)]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "decimal(2, 2)")]
        public Decimal Credit { get; set; }

        public string Description { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        [Required]
        public int SemesterId { get; set; }

        public string SemesterName { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
    }
}
