import {GenericModel} from '../model/generic-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from "../model/page";

export abstract class ApiService<T extends GenericModel> {
  protected readonly API_SERVICE = 'http://localhost:8080';
  protected http: HttpClient;
  protected endpoint = '';

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAllPage(pageNr = 0, pageSize = 100): Observable<Page<T>> {
    return this.http.get<Page<T>>(this.API_SERVICE + this.endpoint + `?pageNr=${pageNr}&pageSize=${pageSize}`); // back tick

  }

  public getAll(): Observable<T[]> {
    const url = this.API_SERVICE + this.endpoint;
    return this.http.get<T[]>(url);
  }


  public getById(id: number): Observable<T> {
    const url = this.API_SERVICE + this.endpoint + '/' + id;
    return this.http.get<T>(url);
  }

  public save(item: T): Observable<T> {
    const url = this.API_SERVICE + this.endpoint;
    this.beforeSave(item);
    if (item.id == null || item.id > 0) {
      return this.http.put<T>(url, item);
    }
    return this.http.post<T>(url, item);
  }

  public delete(id: number): Observable<T> {
    const url = this.API_SERVICE + this.endpoint + '/' + id;
    return this.http.delete<T>(url);
  }

  public beforeSave(item: T): void {
  }
}
