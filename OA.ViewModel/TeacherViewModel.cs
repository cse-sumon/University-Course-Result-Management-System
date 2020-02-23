using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OA.ViewModel
{
    public class TeacherViewModel
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
        public string DesignationName { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        public string DepartmentCode { get; set; }
        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalCredit { get; set; }

       
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
    }
}
