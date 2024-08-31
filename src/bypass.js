export function bypass(request, reply, stream) {
    reply.header('x-proxy-bypass', 1);
    reply.removeHeader('content-encoding'); // Ensure no double-encoding
    stream.pipe(reply.raw);
}
