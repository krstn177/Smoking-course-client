export default interface IVideoCreate{
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    screenshotUrl: string;
    previous?: string | null;
    next?: string | null;
}