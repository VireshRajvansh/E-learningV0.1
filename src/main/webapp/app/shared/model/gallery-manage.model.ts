import { IGalleryGroupManage } from 'app/shared/model//gallery-group-manage.model';

export interface IGalleryManage {
    id?: number;
    imageUrl?: string;
    galleryGroup?: IGalleryGroupManage;
}

export class GalleryManage implements IGalleryManage {
    constructor(public id?: number, public imageUrl?: string, public galleryGroup?: IGalleryGroupManage) {}
}
