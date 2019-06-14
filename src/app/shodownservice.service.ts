import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShodownService {

  username: string;

  constructor() { }

  setUsername(name: string): void {
    this.username = name;
  }
}
