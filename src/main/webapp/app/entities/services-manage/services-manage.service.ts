import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServicesManage } from 'app/shared/model/services-manage.model';

type EntityResponseType = HttpResponse<IServicesManage>;
type EntityArrayResponseType = HttpResponse<IServicesManage[]>;

@Injectable({ providedIn: 'root' })
export class ServicesManageService {
    private resourceUrl = SERVER_API_URL + 'api/services';

    constructor(private http: HttpClient) {}

    create(services: IServicesManage): Observable<EntityResponseType> {
        return this.http.post<IServicesManage>(this.resourceUrl, services, { observe: 'response' });
    }

    update(services: IServicesManage): Observable<EntityResponseType> {
        return this.http.put<IServicesManage>(this.resourceUrl, services, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IServicesManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IServicesManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
