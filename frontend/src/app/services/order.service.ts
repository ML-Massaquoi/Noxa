import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OrderCreateRequest, OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private api: ApiService) {}

  createOrder(order: OrderCreateRequest): Observable<OrderResponse> {
    return this.api.post<OrderResponse>('/orders', order);
  }

  getUserOrders(): Observable<OrderResponse[]> {
    return this.api.get<OrderResponse[]>('/orders/user');
  }

  // Admin endpoints
  getPendingOrders(): Observable<OrderResponse[]> {
    return this.api.get<OrderResponse[]>('/admin/submissions');
  }

  approveOrder(orderId: number): Observable<void> {
    return this.api.patch<void>(`/admin/orders/${orderId}/approve`);
  }

  rejectOrder(orderId: number): Observable<void> {
    return this.api.patch<void>(`/admin/orders/${orderId}/reject`);
  }
}
