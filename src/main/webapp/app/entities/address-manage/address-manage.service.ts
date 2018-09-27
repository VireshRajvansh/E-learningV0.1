import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressManage } from 'app/shared/model/address-manage.model';

type EntityResponseType = HttpResponse<IAddressManage>;
type EntityArrayResponseType = HttpResponse<IAddressManage[]>;

@Injectable({ providedIn: 'root' })
export class AddressManageService {
    private resourceUrl = SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) {}

    create(address: IAddressManage): Observable<EntityResponseType> {
        return this.http.post<IAddressManage>(this.resourceUrl, address, { observe: 'response' });
    }

    update(address: IAddressManage): Observable<EntityResponseType> {
        return this.http.put<IAddressManage>(this.resourceUrl, address, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddressManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
