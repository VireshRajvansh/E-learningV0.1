import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlayListManage } from 'app/shared/model/play-list-manage.model';

type EntityResponseType = HttpResponse<IPlayListManage>;
type EntityArrayResponseType = HttpResponse<IPlayListManage[]>;

@Injectable({ providedIn: 'root' })
export class PlayListManageService {
    private resourceUrl = SERVER_API_URL + 'api/play-lists';

    constructor(private http: HttpClient) {}

    create(playList: IPlayListManage): Observable<EntityResponseType> {
        return this.http.post<IPlayListManage>(this.resourceUrl, playList, { observe: 'response' });
    }

    update(playList: IPlayListManage): Observable<EntityResponseType> {
        return this.http.put<IPlayListManage>(this.resourceUrl, playList, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlayListManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlayListManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
