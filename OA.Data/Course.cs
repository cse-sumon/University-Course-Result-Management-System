using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OA.DBModel
{
    public class Course
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
        [Required]
        public int SemesterId { get; set; }
       
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
    }
}
