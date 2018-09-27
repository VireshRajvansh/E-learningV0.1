import { IGalleryManage } from 'app/shared/model//gallery-manage.model';

export interface IGalleryGroupManage {
    id?: number;
    name?: string;
    galleries?: IGalleryManage[];
}

export class GalleryGroupManage implements IGalleryGroupManage {
    constructor(public id?: number, public name?: string, public galleries?: IGalleryManage[]) {}
}
