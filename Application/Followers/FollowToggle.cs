using Application.Core;
using Application.Interfaces;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly ImageGalleryContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(ImageGalleryContext context, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var follower = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var followed = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUsername);

                if (followed == null) return null;

                var following = await _context.UserFollowings.FindAsync(follower.Id, followed.Id);

                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Follower = follower,
                        Followed = followed
                    };

                    _context.UserFollowings.Add(following);
                }
                else
                {
                    _context.UserFollowings.Remove(following);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update following");
            }
        }
    }
}