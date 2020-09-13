import {GenericModel} from '../model/generic-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class ApiService<T extends GenericModel> {
  private readonly API_SERVICE = 'http://localhost:8080';
  private http: HttpClient;
  protected endpoint = '';

  constructor(http: HttpClient) {
    this.http = http;
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
    if (item.id > 0) {
      return this.http.put<T>(url, item);
    }
    return this.http.post<T>(url, item);
  }

  public delete(id: number): Observable<T> {
    const url = this.API_SERVICE + this.endpoint + '/' + id;
    return this.http.delete<T>(url);
  }
}