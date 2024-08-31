import sharp from 'sharp';
import { redirect } from './redirect.js';

export function compressImg(request, reply, imgStream) {
    const { webp, grayscale, quality, originSize } = request.params;
    const imgFormat = webp ? 'webp' : 'jpeg';

    try {
        let sharpInstance = sharp()
            .grayscale(grayscale)
            .toFormat(imgFormat, {
                quality,
                progressive: true,
                optimizeScans: webp,
                chromaSubsampling: webp ? '4:4:4' : '4:2:0',
            });

        // Pipe the incoming image stream through sharp and then to the reply stream
        imgStream
            .pipe(sharpInstance)
            .on('info', (info) => {
                reply
                    .header('content-type', `image/${imgFormat}`)
                    .header('content-length', info.size)
                    .header('x-original-size', originSize)
                    .header('x-bytes-saved', originSize - info.size)
                    .code(200);
            })
            .pipe(reply.raw); // Pipe the final result to the reply stream
    } catch (error) {
        return redirect(request, reply);
    }
}
