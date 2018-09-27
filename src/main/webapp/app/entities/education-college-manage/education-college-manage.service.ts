import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEducationCollegeManage } from 'app/shared/model/education-college-manage.model';

type EntityResponseType = HttpResponse<IEducationCollegeManage>;
type EntityArrayResponseType = HttpResponse<IEducationCollegeManage[]>;

@Injectable({ providedIn: 'root' })
export class EducationCollegeManageService {
    private resourceUrl = SERVER_API_URL + 'api/education-colleges';

    constructor(private http: HttpClient) {}

    create(educationCollege: IEducationCollegeManage): Observable<EntityResponseType> {
        return this.http.post<IEducationCollegeManage>(this.resourceUrl, educationCollege, { observe: 'response' });
    }

    update(educationCollege: IEducationCollegeManage): Observable<EntityResponseType> {
        return this.http.put<IEducationCollegeManage>(this.resourceUrl, educationCollege, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEducationCollegeManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEducationCollegeManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
