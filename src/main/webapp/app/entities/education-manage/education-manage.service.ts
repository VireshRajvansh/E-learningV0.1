import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEducationManage } from 'app/shared/model/education-manage.model';

type EntityResponseType = HttpResponse<IEducationManage>;
type EntityArrayResponseType = HttpResponse<IEducationManage[]>;

@Injectable({ providedIn: 'root' })
export class EducationManageService {
    private resourceUrl = SERVER_API_URL + 'api/educations';

    constructor(private http: HttpClient) {}

    create(education: IEducationManage): Observable<EntityResponseType> {
        return this.http.post<IEducationManage>(this.resourceUrl, education, { observe: 'response' });
    }

    update(education: IEducationManage): Observable<EntityResponseType> {
        return this.http.put<IEducationManage>(this.resourceUrl, education, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEducationManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEducationManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
