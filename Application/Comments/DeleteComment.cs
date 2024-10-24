using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class DeleteComment
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int CommentId { get; set; }
            public string PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ImageGalleryContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(ImageGalleryContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _context.Comments
                    .Include(c => c.Author)
                    .FirstOrDefaultAsync(c => c.CommentId == request.CommentId && c.Photo.Id == request.PhotoId);

                if (comment == null)
                    return Result<Unit>.Failure("Comment not found");

                var currentUser = _userAccessor.GetUsername();

                if (comment.Author.UserName != currentUser)
                    return Result<Unit>.Failure("You are not authorized to delete this comment");

                _context.Comments.Remove(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (!success)
                    return Result<Unit>.Failure("Problem deleting comment");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
