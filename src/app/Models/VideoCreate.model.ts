export default interface IVideoCreate{
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    screenshotUrl: string;
    duration: string;
    previous?: string | null;
    next?: string | null;
}