﻿using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService) 
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) { return Unauthorized(); }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register (RegistrerDto registrerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registrerDto.Email))
            {
                ModelState.AddModelError("email", "Email already taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync( x => x.UserName == registrerDto.Username))
            {
                ModelState.AddModelError("username", "Username already taken"); 
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registrerDto.DisplayName,
                Email = registrerDto.Email,
                UserName = registrerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registrerDto.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }
            
            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}
