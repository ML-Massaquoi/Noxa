import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private api: ApiService) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.api.get<MenuItem[]>('/menu');
  }

  getMenuItemsByCategory(category: string): Observable<MenuItem[]> {
    return this.api.get<MenuItem[]>(`/menu?category=${category}`);
  }
}
