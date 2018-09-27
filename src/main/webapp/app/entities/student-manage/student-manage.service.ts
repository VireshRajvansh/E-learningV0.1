import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentManage } from 'app/shared/model/student-manage.model';

type EntityResponseType = HttpResponse<IStudentManage>;
type EntityArrayResponseType = HttpResponse<IStudentManage[]>;

@Injectable({ providedIn: 'root' })
export class StudentManageService {
    private resourceUrl = SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient) {}

    create(student: IStudentManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(student);
        return this.http
            .post<IStudentManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(student: IStudentManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(student);
        return this.http
            .put<IStudentManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStudentManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStudentManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(student: IStudentManage): IStudentManage {
        const copy: IStudentManage = Object.assign({}, student, {
            dob: student.dob != null && student.dob.isValid() ? student.dob.format(DATE_FORMAT) : null,
            premiumTill: student.premiumTill != null && student.premiumTill.isValid() ? student.premiumTill.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dob = res.body.dob != null ? moment(res.body.dob) : null;
        res.body.premiumTill = res.body.premiumTill != null ? moment(res.body.premiumTill) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((student: IStudentManage) => {
            student.dob = student.dob != null ? moment(student.dob) : null;
            student.premiumTill = student.premiumTill != null ? moment(student.premiumTill) : null;
        });
        return res;
    }
}
