using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Application.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        public Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<string> DeletePhoto(string publicId)
        {
            throw new NotImplementedException();
        }
    }
}
