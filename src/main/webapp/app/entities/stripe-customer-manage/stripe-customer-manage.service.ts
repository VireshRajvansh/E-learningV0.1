import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStripeCustomerManage } from 'app/shared/model/stripe-customer-manage.model';

type EntityResponseType = HttpResponse<IStripeCustomerManage>;
type EntityArrayResponseType = HttpResponse<IStripeCustomerManage[]>;

@Injectable({ providedIn: 'root' })
export class StripeCustomerManageService {
    private resourceUrl = SERVER_API_URL + 'api/stripe-customers';

    constructor(private http: HttpClient) {}

    create(stripeCustomer: IStripeCustomerManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stripeCustomer);
        return this.http
            .post<IStripeCustomerManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stripeCustomer: IStripeCustomerManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stripeCustomer);
        return this.http
            .put<IStripeCustomerManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStripeCustomerManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStripeCustomerManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(stripeCustomer: IStripeCustomerManage): IStripeCustomerManage {
        const copy: IStripeCustomerManage = Object.assign({}, stripeCustomer, {
            created: stripeCustomer.created != null && stripeCustomer.created.isValid() ? stripeCustomer.created.toJSON() : null,
            expectedExpiryDate:
                stripeCustomer.expectedExpiryDate != null && stripeCustomer.expectedExpiryDate.isValid()
                    ? stripeCustomer.expectedExpiryDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.created = res.body.created != null ? moment(res.body.created) : null;
        res.body.expectedExpiryDate = res.body.expectedExpiryDate != null ? moment(res.body.expectedExpiryDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((stripeCustomer: IStripeCustomerManage) => {
            stripeCustomer.created = stripeCustomer.created != null ? moment(stripeCustomer.created) : null;
            stripeCustomer.expectedExpiryDate =
                stripeCustomer.expectedExpiryDate != null ? moment(stripeCustomer.expectedExpiryDate) : null;
        });
        return res;
    }
}
