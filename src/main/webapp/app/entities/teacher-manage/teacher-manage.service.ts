import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeacherManage } from 'app/shared/model/teacher-manage.model';

type EntityResponseType = HttpResponse<ITeacherManage>;
type EntityArrayResponseType = HttpResponse<ITeacherManage[]>;

@Injectable({ providedIn: 'root' })
export class TeacherManageService {
    private resourceUrl = SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient) {}

    create(teacher: ITeacherManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teacher);
        return this.http
            .post<ITeacherManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(teacher: ITeacherManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teacher);
        return this.http
            .put<ITeacherManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITeacherManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITeacherManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(teacher: ITeacherManage): ITeacherManage {
        const copy: ITeacherManage = Object.assign({}, teacher, {
            dob: teacher.dob != null && teacher.dob.isValid() ? teacher.dob.format(DATE_FORMAT) : null,
            premiumTill: teacher.premiumTill != null && teacher.premiumTill.isValid() ? teacher.premiumTill.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dob = res.body.dob != null ? moment(res.body.dob) : null;
        res.body.premiumTill = res.body.premiumTill != null ? moment(res.body.premiumTill) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((teacher: ITeacherManage) => {
            teacher.dob = teacher.dob != null ? moment(teacher.dob) : null;
            teacher.premiumTill = teacher.premiumTill != null ? moment(teacher.premiumTill) : null;
        });
        return res;
    }
}
