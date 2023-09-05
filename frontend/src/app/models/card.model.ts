import { AbstractModel } from "./abstract.model";
import { Image } from "./image.model";

export interface Card extends AbstractModel {
    image: Image;
}