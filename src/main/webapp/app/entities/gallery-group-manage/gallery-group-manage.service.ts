import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGalleryGroupManage } from 'app/shared/model/gallery-group-manage.model';

type EntityResponseType = HttpResponse<IGalleryGroupManage>;
type EntityArrayResponseType = HttpResponse<IGalleryGroupManage[]>;

@Injectable({ providedIn: 'root' })
export class GalleryGroupManageService {
    private resourceUrl = SERVER_API_URL + 'api/gallery-groups';

    constructor(private http: HttpClient) {}

    create(galleryGroup: IGalleryGroupManage): Observable<EntityResponseType> {
        return this.http.post<IGalleryGroupManage>(this.resourceUrl, galleryGroup, { observe: 'response' });
    }

    update(galleryGroup: IGalleryGroupManage): Observable<EntityResponseType> {
        return this.http.put<IGalleryGroupManage>(this.resourceUrl, galleryGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGalleryGroupManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGalleryGroupManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
