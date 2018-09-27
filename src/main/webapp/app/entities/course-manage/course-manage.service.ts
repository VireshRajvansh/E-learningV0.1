import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICourseManage } from 'app/shared/model/course-manage.model';

type EntityResponseType = HttpResponse<ICourseManage>;
type EntityArrayResponseType = HttpResponse<ICourseManage[]>;

@Injectable({ providedIn: 'root' })
export class CourseManageService {
    private resourceUrl = SERVER_API_URL + 'api/courses';

    constructor(private http: HttpClient) {}

    create(course: ICourseManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(course);
        return this.http
            .post<ICourseManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(course: ICourseManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(course);
        return this.http
            .put<ICourseManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICourseManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICourseManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(course: ICourseManage): ICourseManage {
        const copy: ICourseManage = Object.assign({}, course, {
            premiumTill: course.premiumTill != null && course.premiumTill.isValid() ? course.premiumTill.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.premiumTill = res.body.premiumTill != null ? moment(res.body.premiumTill) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((course: ICourseManage) => {
            course.premiumTill = course.premiumTill != null ? moment(course.premiumTill) : null;
        });
        return res;
    }
}
