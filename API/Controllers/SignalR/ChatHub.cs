using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public  ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var photoIdString = httpContext.Request.Query["photoId"].ToString();

            if (Guid.TryParse(photoIdString, out Guid photoId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, photoId.ToString());

                var result = await _mediator.Send(new CommentList.Query { PhotoId = photoId });
                await Clients.Caller.SendAsync("LoadComments", result.Value);
            }
            else
            {
                // Handle invalid photoId format, e.g., log an error or abort the connection
                Console.WriteLine($"Invalid photoId format: {photoIdString}");
                Context.Abort(); // Optionally abort the connection
            }
        }
    }
} 