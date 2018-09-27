import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGalleryManage } from 'app/shared/model/gallery-manage.model';

type EntityResponseType = HttpResponse<IGalleryManage>;
type EntityArrayResponseType = HttpResponse<IGalleryManage[]>;

@Injectable({ providedIn: 'root' })
export class GalleryManageService {
    private resourceUrl = SERVER_API_URL + 'api/galleries';

    constructor(private http: HttpClient) {}

    create(gallery: IGalleryManage): Observable<EntityResponseType> {
        return this.http.post<IGalleryManage>(this.resourceUrl, gallery, { observe: 'response' });
    }

    update(gallery: IGalleryManage): Observable<EntityResponseType> {
        return this.http.put<IGalleryManage>(this.resourceUrl, gallery, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGalleryManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGalleryManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
