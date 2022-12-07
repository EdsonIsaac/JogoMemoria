import { User } from "./user.model";

export class Card {
    id!: number;
    cardOne!: string;
    cardTwo!: string;
    user!: User;

    constructor() {
        this.user = new User();
    }
}