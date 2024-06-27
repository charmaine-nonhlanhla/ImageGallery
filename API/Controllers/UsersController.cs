using Application.Users;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {

        [HttpGet] //api/users 
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await Mediator.Send(new UserList.Query());
        }
        [HttpGet("{id}")] //api/users/usus
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await Mediator.Send(new UserDetails.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            await Mediator.Send(new CreateUser.Command { User = user });

            return Ok();
        }
    }
}