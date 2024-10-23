using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(CreateComment.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.PhotoId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public async Task DeleteComment(int commentId, string photoId)
        {
            var result = await _mediator.Send(new DeleteComment.Command { CommentId = commentId, PhotoId = photoId });

            if (result.IsSuccess)
            {
                await Clients.Group(photoId).SendAsync("CommentDeleted", commentId);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var photoId = httpContext.Request.Query["photoId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, photoId);
            var result = await _mediator.Send(new CommentList.Query { PhotoId = photoId });
            await Clients.Caller.SendAsync("LoadComments", result.Value);

        }
    }
}