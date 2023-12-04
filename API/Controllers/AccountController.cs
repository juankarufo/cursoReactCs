using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
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

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Logtin(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) { return Unauthorized(); }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register (RegistrerDto registrerDto)
        {
            if (await _userManager.Users.AnyAsync( x => x.UserName == registrerDto.Username))
            {
                return BadRequest("Username already taken");
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registrerDto.Email))
            {
                return BadRequest("Email already taken");
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
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
            }else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}
