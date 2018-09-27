import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICityManage } from 'app/shared/model/city-manage.model';

type EntityResponseType = HttpResponse<ICityManage>;
type EntityArrayResponseType = HttpResponse<ICityManage[]>;

@Injectable({ providedIn: 'root' })
export class CityManageService {
    private resourceUrl = SERVER_API_URL + 'api/cities';

    constructor(private http: HttpClient) {}

    create(city: ICityManage): Observable<EntityResponseType> {
        return this.http.post<ICityManage>(this.resourceUrl, city, { observe: 'response' });
    }

    update(city: ICityManage): Observable<EntityResponseType> {
        return this.http.put<ICityManage>(this.resourceUrl, city, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICityManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICityManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
