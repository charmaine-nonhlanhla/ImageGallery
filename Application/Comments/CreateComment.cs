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
                RuleFor(x => x.CommentText).NotEmpty();
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
               var photo = await _context.Photos.FindAsync(request.PhotoId);
               
               if (photo == null) return null;

               var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Photo = photo,
                    CommentText = request.CommentText                  
                };

                photo.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}