export interface IPlayListManage {
    id?: number;
    name?: string;
    slug?: string;
    type?: string;
    length?: number;
    duration?: string;
    tagLine?: string;
    active?: boolean;
}

export class PlayListManage implements IPlayListManage {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public type?: string,
        public length?: number,
        public duration?: string,
        public tagLine?: string,
        public active?: boolean
    ) {
        this.active = this.active || false;
    }
}
