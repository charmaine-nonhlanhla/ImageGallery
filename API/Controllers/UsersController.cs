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
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(int id, User user)
        {
            user.UserId = id;

            await Mediator.Send(new EditUser.Command { User = user });

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await Mediator.Send(new DeleteUser.Command { Id = id});

            return Ok();
        }
    }
}