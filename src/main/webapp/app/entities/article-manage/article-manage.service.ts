import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticleManage } from 'app/shared/model/article-manage.model';

type EntityResponseType = HttpResponse<IArticleManage>;
type EntityArrayResponseType = HttpResponse<IArticleManage[]>;

@Injectable({ providedIn: 'root' })
export class ArticleManageService {
    private resourceUrl = SERVER_API_URL + 'api/articles';

    constructor(private http: HttpClient) {}

    create(article: IArticleManage): Observable<EntityResponseType> {
        return this.http.post<IArticleManage>(this.resourceUrl, article, { observe: 'response' });
    }

    update(article: IArticleManage): Observable<EntityResponseType> {
        return this.http.put<IArticleManage>(this.resourceUrl, article, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticleManage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArticleManage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
