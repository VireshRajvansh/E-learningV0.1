import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStripePaymentManage } from 'app/shared/model/stripe-payment-manage.model';

type EntityResponseType = HttpResponse<IStripePaymentManage>;
type EntityArrayResponseType = HttpResponse<IStripePaymentManage[]>;

@Injectable({ providedIn: 'root' })
export class StripePaymentManageService {
    private resourceUrl = SERVER_API_URL + 'api/stripe-payments';

    constructor(private http: HttpClient) {}

    create(stripePayment: IStripePaymentManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stripePayment);
        return this.http
            .post<IStripePaymentManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stripePayment: IStripePaymentManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stripePayment);
        return this.http
            .put<IStripePaymentManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStripePaymentManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStripePaymentManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(stripePayment: IStripePaymentManage): IStripePaymentManage {
        const copy: IStripePaymentManage = Object.assign({}, stripePayment, {
            created: stripePayment.created != null && stripePayment.created.isValid() ? stripePayment.created.toJSON() : null,
            planCreated:
                stripePayment.planCreated != null && stripePayment.planCreated.isValid() ? stripePayment.planCreated.toJSON() : null,
            periodEnd: stripePayment.periodEnd != null && stripePayment.periodEnd.isValid() ? stripePayment.periodEnd.toJSON() : null,
            periodStart:
                stripePayment.periodStart != null && stripePayment.periodStart.isValid() ? stripePayment.periodStart.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.created = res.body.created != null ? moment(res.body.created) : null;
        res.body.planCreated = res.body.planCreated != null ? moment(res.body.planCreated) : null;
        res.body.periodEnd = res.body.periodEnd != null ? moment(res.body.periodEnd) : null;
        res.body.periodStart = res.body.periodStart != null ? moment(res.body.periodStart) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((stripePayment: IStripePaymentManage) => {
            stripePayment.created = stripePayment.created != null ? moment(stripePayment.created) : null;
            stripePayment.planCreated = stripePayment.planCreated != null ? moment(stripePayment.planCreated) : null;
            stripePayment.periodEnd = stripePayment.periodEnd != null ? moment(stripePayment.periodEnd) : null;
            stripePayment.periodStart = stripePayment.periodStart != null ? moment(stripePayment.periodStart) : null;
        });
        return res;
    }
}
