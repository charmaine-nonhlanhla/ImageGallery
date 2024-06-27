using Domain.Models;
using MediatR;
using Persistence;

namespace Application.ImageTags
{
    public class EditImageTag
    {
        public class Command : IRequest
        {
            public ImageTag ImageTag { get; set; }
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
                var imagetag = await _context.ImageTags.FindAsync(request.ImageTag.ImageTagId);

                if (imagetag == null)
                {
                    // Handle the case when the image tag is not found, e.g., throw an exception or return an error
                    throw new Exception("ImageTag not found");
                }

                // Assuming you want to update fields other than the primary key
                imagetag.ImageTagId = request.ImageTag.ImageTagId; // Update other properties as needed

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}