using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OA.DBModel
{
    public class Register
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }    
        [Required]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
    }
}
