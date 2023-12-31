﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegistrerDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        //[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string DisplayName { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
