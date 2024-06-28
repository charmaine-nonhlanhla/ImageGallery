using AutoMapper;
using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Images
{
    public class EditImage
    {
        public class Command : IRequest
        {
            public Image Image { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly ImageGalleryContext _context;
        private readonly IMapper _mapper;
            public Handler(ImageGalleryContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
                
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var image = await _context.Images.FindAsync(request.Image.ImageId);

                _mapper.Map(request.Image, image);

                await _context.SaveChangesAsync();
            }
        }
    }
}