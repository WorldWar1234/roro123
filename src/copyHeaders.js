export function copyHeaders(source, target) {
  for (const [key, value] of source.headers.entries()) {
    try {
      // If the value is iterable (like an array), join it into a single string
      const headerValue = Array.isArray(value) ? value.join(', ') : value;
      target.header(key, headerValue);
    } catch (e) {
      // Log any errors encountered when setting headers
      console.log(`Failed to set header ${key}: ${e.message}`);
    }
  }
}
