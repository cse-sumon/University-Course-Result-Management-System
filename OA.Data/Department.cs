using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OA.DBModel
{
    public class Department
    {
      
        public int Id { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(7)]
        public string Code { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedAt { get; set; }
        [Required]
        public bool IsDeleted { get; set; }

    }
}
