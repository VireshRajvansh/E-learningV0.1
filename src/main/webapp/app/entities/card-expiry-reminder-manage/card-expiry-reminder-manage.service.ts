import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICardExpiryReminderManage } from 'app/shared/model/card-expiry-reminder-manage.model';

type EntityResponseType = HttpResponse<ICardExpiryReminderManage>;
type EntityArrayResponseType = HttpResponse<ICardExpiryReminderManage[]>;

@Injectable({ providedIn: 'root' })
export class CardExpiryReminderManageService {
    private resourceUrl = SERVER_API_URL + 'api/card-expiry-reminders';

    constructor(private http: HttpClient) {}

    create(cardExpiryReminder: ICardExpiryReminderManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cardExpiryReminder);
        return this.http
            .post<ICardExpiryReminderManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cardExpiryReminder: ICardExpiryReminderManage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cardExpiryReminder);
        return this.http
            .put<ICardExpiryReminderManage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICardExpiryReminderManage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICardExpiryReminderManage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(cardExpiryReminder: ICardExpiryReminderManage): ICardExpiryReminderManage {
        const copy: ICardExpiryReminderManage = Object.assign({}, cardExpiryReminder, {
            sendOnDate:
                cardExpiryReminder.sendOnDate != null && cardExpiryReminder.sendOnDate.isValid()
                    ? cardExpiryReminder.sendOnDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.sendOnDate = res.body.sendOnDate != null ? moment(res.body.sendOnDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((cardExpiryReminder: ICardExpiryReminderManage) => {
            cardExpiryReminder.sendOnDate = cardExpiryReminder.sendOnDate != null ? moment(cardExpiryReminder.sendOnDate) : null;
        });
        return res;
    }
}
