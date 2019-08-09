declare module 'image-downloader' {
  export interface downloaderOptions {
    url: string,
    dest: string,
  }
  export interface downloaderResult {
    filename: string,
    image: string,
  }

  export function image(options: downloaderOptions): Promise<downloaderResult>;
}
