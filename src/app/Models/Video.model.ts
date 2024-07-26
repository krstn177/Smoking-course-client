import IVideoSlim from "./VideoSlim.model";

export default interface IVideo{
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    screenshotUrl: string;
    duration: string;
    previous?: IVideoSlim;
    next?: IVideoSlim;
}