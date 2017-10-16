import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Idea } from './idea';

@Injectable()
export class IdeaService {
    //URLs for CRUD operations
    allIdeasUrl = "http://localhost:8080/dbs/all-ideas";
    //allArticlesUrl = "http://localhost:8080/DBSIdeaGenTool/dbs/ideagentool";
    ideaUrl = "http://localhost:8080/dbs/idea";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all idea
    getAllIdeas(): Observable<Idea[]> {
        return this.http.get(this.allIdeasUrl)
                .map(this.extractData)
                .catch(this.handleError);

    }
    //Create idea
    createIdea(idea: Idea):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.ideaUrl, idea, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch idea by id
    getIdeaById(ideaId: string): Observable<Idea> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let cpParams = new URLSearchParams();
        cpParams.set('id', ideaId);          
        let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.get(this.ideaUrl, options)
               .map(this.extractData)
               .catch(this.handleError);
    }   
    //Update idea
    updateIdea(idea: Idea):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.ideaUrl, idea, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete idea    
    deleteIdeaById(ideaId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let cpParams = new URLSearchParams();
        cpParams.set('id', ideaId);          
        let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.delete(this.ideaUrl, options)
               .map(success => success.status)
               .catch(this.handleError);
    }       
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}