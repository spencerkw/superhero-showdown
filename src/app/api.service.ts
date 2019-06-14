import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get("http://localhost:5000/api/heroes", { responseType: "json"});
  }

  getTypes() {
    return this.http.get("http://localhost:5000/api/attack-types", { responseType: "json"});
  }
}
