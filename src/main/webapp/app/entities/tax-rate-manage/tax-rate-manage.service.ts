import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaxRateManage } from 'app/shared/model/tax-rate-manage.model';

type EntityResponseType = HttpResponse<ITaxRateManage>;
type EntityArrayResponseType = HttpResponse<ITaxRateManage[]>;

@Injectable({ providedIn: 'root' })
export class TaxRateManageService {
    private resourceUrl = SERVER_API_URL + 'api/tax-rates';

    constructor(private http: HttpClient) {}

    create(taxRate: ITaxRateManage): Observable<EntityResponseType> {
        return this.http.post<ITaxRateManage>(this.resourceUrl, taxRate, { observe: 'response' });
    }

    update(taxRate: ITaxRateManage): Observable<EntityResponseType> {
        return this.http.put<ITaxRateManage>(this.resourceUrl, taxRate, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITaxRateManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITaxRateManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
