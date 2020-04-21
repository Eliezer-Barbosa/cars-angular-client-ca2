import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

// const baseUrl = 'http://localhost:8080/api/cars';
const baseUrl = 'https://eliezer-meanstack-api.herokuapp.com/api/cars';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(baseUrl);
  }

  public get(id: any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(data: any) {
    return this.http.post(baseUrl, data);
  }

  public update(id: any, data: any) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  public delete(id: any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public deleteAll() {
    return this.http.delete(baseUrl);
  }

  public findByName(name: any) {
    return this.http.get(`${baseUrl}?name=${name}`);
  }
}
