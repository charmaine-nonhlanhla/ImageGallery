using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CreateComment
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string CommentText { get; set; }
            public Guid PhotoId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CommentText).NotEmpty().WithMessage("Comment text is required.");
                RuleFor(x => x.PhotoId).NotEmpty().WithMessage("Photo ID is required.");
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly ImageGalleryContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            
            public Handler(ImageGalleryContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Check if the photo exists
                var photo = await _context.Photos.FindAsync(request.PhotoId);
                if (photo == null) 
                {
                    return Result<CommentDto>.Failure("Photo not found.");
                }

                // Check if the user exists
                var username = _userAccessor.GetUsername();
                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == username);

                if (user == null) 
                {
                    return Result<CommentDto>.Failure("User not found.");
                }

                // Create and add the comment
                var comment = new Comment
                {
                    Author = user,
                    Photo = photo,
                    CreatedAt = DateTime.UtcNow,
                    CommentText = request.CommentText                  
                };

                photo.Comments.Add(comment);

                // Save changes to the database
                var success = await _context.SaveChangesAsync() > 0;

                if (success) 
                {
                    return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                }

                return Result<CommentDto>.Failure("Failed to add comment.");
            }
        }
    }
}
