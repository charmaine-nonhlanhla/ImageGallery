using Application.Core;
using AutoMapper;
using Domain.Models;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class EditCategory
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
        private readonly IMapper _mapper;
            public Handler(ImageGalleryContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
                
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Category.CategoryId);

                if (category == null) return null;

                _mapper.Map(request.Category, category);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update category");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}