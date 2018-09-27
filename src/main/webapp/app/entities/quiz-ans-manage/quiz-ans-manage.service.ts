import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuizAnsManage } from 'app/shared/model/quiz-ans-manage.model';

type EntityResponseType = HttpResponse<IQuizAnsManage>;
type EntityArrayResponseType = HttpResponse<IQuizAnsManage[]>;

@Injectable({ providedIn: 'root' })
export class QuizAnsManageService {
    private resourceUrl = SERVER_API_URL + 'api/quiz-ans';

    constructor(private http: HttpClient) {}

    create(quizAns: IQuizAnsManage): Observable<EntityResponseType> {
        return this.http.post<IQuizAnsManage>(this.resourceUrl, quizAns, { observe: 'response' });
    }

    update(quizAns: IQuizAnsManage): Observable<EntityResponseType> {
        return this.http.put<IQuizAnsManage>(this.resourceUrl, quizAns, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuizAnsManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuizAnsManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
