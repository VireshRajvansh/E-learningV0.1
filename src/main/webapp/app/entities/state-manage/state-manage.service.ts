import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStateManage } from 'app/shared/model/state-manage.model';

type EntityResponseType = HttpResponse<IStateManage>;
type EntityArrayResponseType = HttpResponse<IStateManage[]>;

@Injectable({ providedIn: 'root' })
export class StateManageService {
    private resourceUrl = SERVER_API_URL + 'api/states';

    constructor(private http: HttpClient) {}

    create(state: IStateManage): Observable<EntityResponseType> {
        return this.http.post<IStateManage>(this.resourceUrl, state, { observe: 'response' });
    }

    update(state: IStateManage): Observable<EntityResponseType> {
        return this.http.put<IStateManage>(this.resourceUrl, state, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStateManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStateManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
