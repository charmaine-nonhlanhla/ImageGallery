using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class EditComment
    {
        public class Command : IRequest
        {
            public Comment Comment { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _context.Comments.FindAsync(request.Comment.CommentId);

                comment.CommentText = request.Comment.CommentText ?? comment.CommentText;

                await _context.SaveChangesAsync();
            }
        }
    }
}