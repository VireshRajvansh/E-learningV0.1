import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserSignUpByReferralCodeManage } from 'app/shared/model/user-sign-up-by-referral-code-manage.model';

type EntityResponseType = HttpResponse<IUserSignUpByReferralCodeManage>;
type EntityArrayResponseType = HttpResponse<IUserSignUpByReferralCodeManage[]>;

@Injectable({ providedIn: 'root' })
export class UserSignUpByReferralCodeManageService {
    private resourceUrl = SERVER_API_URL + 'api/user-sign-up-by-referral-codes';

    constructor(private http: HttpClient) {}

    create(userSignUpByReferralCode: IUserSignUpByReferralCodeManage): Observable<EntityResponseType> {
        return this.http.post<IUserSignUpByReferralCodeManage>(this.resourceUrl, userSignUpByReferralCode, { observe: 'response' });
    }

    update(userSignUpByReferralCode: IUserSignUpByReferralCodeManage): Observable<EntityResponseType> {
        return this.http.put<IUserSignUpByReferralCodeManage>(this.resourceUrl, userSignUpByReferralCode, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserSignUpByReferralCodeManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserSignUpByReferralCodeManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
