import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuizManage } from 'app/shared/model/quiz-manage.model';

type EntityResponseType = HttpResponse<IQuizManage>;
type EntityArrayResponseType = HttpResponse<IQuizManage[]>;

@Injectable({ providedIn: 'root' })
export class QuizManageService {
    private resourceUrl = SERVER_API_URL + 'api/quizzes';

    constructor(private http: HttpClient) {}

    create(quiz: IQuizManage): Observable<EntityResponseType> {
        return this.http.post<IQuizManage>(this.resourceUrl, quiz, { observe: 'response' });
    }

    update(quiz: IQuizManage): Observable<EntityResponseType> {
        return this.http.put<IQuizManage>(this.resourceUrl, quiz, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuizManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuizManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
