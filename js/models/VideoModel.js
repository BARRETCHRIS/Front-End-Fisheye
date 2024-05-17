import  MediaModel  from "./MediaModel.js";

export default class VideoModel extends MediaModel {
    constructor(data) {
        super(data);
        this.video = data.video;
    }
}