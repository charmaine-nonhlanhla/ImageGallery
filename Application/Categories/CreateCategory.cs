using Application.Core;
using Domain.Models;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class CreateCategory
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Category Category { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Category).SetValidator(new CategoryValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Categories.Add(request.Category);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create the category");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}