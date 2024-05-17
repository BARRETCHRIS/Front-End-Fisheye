import Image from '../models/ImageModel.js'
import Video from '../models/VideoModel.js'

export default class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw 'Unknown data type'
        }
    }
}