import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStripeTransactionManage } from 'app/shared/model/stripe-transaction-manage.model';

type EntityResponseType = HttpResponse<IStripeTransactionManage>;
type EntityArrayResponseType = HttpResponse<IStripeTransactionManage[]>;

@Injectable({ providedIn: 'root' })
export class StripeTransactionManageService {
    private resourceUrl = SERVER_API_URL + 'api/stripe-transactions';

    constructor(private http: HttpClient) {}

    create(stripeTransaction: IStripeTransactionManage): Observable<EntityResponseType> {
        return this.http.post<IStripeTransactionManage>(this.resourceUrl, stripeTransaction, { observe: 'response' });
    }

    update(stripeTransaction: IStripeTransactionManage): Observable<EntityResponseType> {
        return this.http.put<IStripeTransactionManage>(this.resourceUrl, stripeTransaction, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStripeTransactionManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStripeTransactionManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
