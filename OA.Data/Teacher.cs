using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OA.DBModel
{
    public class Teacher 
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Mobile { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public int DesignationId { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalCredit { get; set; }
        
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
    }
}
