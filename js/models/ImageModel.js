import MediaModel from "./MediaModel.js";

export default class ImageModel extends MediaModel {
    constructor(data) {
        super(data);
        this.image = data.image;
    }
};