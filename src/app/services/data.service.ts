import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchData } from '../models/searchData';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:HttpClient) { }

  getDataByCategory(category: string):Observable<any> {
    const url = environment.jokesApiUrl + "random?category=" + category;
    return this.http.get<any>(url);
  }

  getDataByText(query: string):Observable<any> {
    const url = environment.jokesApiUrl + "search?query=" + query;
    return this.http.get<any>(url);
  }

  getDataRandom():Observable<any> {
    const url = environment.jokesApiUrl + "random";
    return this.http.get<any>(url);
  }

  getListCategories():Observable<any> {
    const url = environment.jokesApiUrl + "categories";
    return this.http.get<any>(url);
  }

  saveSearch(searchData: SearchData):Observable<any> {
    console.log("searchData", searchData);
    return this.http.post(environment.localApiUrl + '/search', searchData);
  }
}

