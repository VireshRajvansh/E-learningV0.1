import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobsManage } from 'app/shared/model/jobs-manage.model';

type EntityResponseType = HttpResponse<IJobsManage>;
type EntityArrayResponseType = HttpResponse<IJobsManage[]>;

@Injectable({ providedIn: 'root' })
export class JobsManageService {
    private resourceUrl = SERVER_API_URL + 'api/jobs';

    constructor(private http: HttpClient) {}

    create(jobs: IJobsManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(jobs);
        return this.http
            .post<IJobsManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(jobs: IJobsManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(jobs);
        return this.http
            .put<IJobsManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IJobsManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobsManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(jobs: IJobsManage): IJobsManage {
        const copy: IJobsManage = Object.assign({}, jobs, {
            runOn: jobs.runOn != null && jobs.runOn.isValid() ? jobs.runOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.runOn = res.body.runOn != null ? moment(res.body.runOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((jobs: IJobsManage) => {
            jobs.runOn = jobs.runOn != null ? moment(jobs.runOn) : null;
        });
        return res;
    }
}
