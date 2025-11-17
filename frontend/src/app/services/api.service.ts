import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FoodItem } from '../models/food-item.model';
import { Order, OrderSubmission } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<FoodItem[]> {
    return of([
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
        price: 12.99,
        category: 'pizza'
      },
      {
        id: '2',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing.',
        price: 9.50,
        category: 'salad'
      },
      {
        id: '3',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        price: 7.00,
        category: 'dessert'
      },
      {
        id: '4',
        name: 'Classic Burger',
        description: 'A savory beef patty topped with cheddar cheese, fresh lettuce, and tomato.',
        price: 11.25,
        category: 'burger'
      }
    ]);
  }

  placeOrder(orderData: OrderSubmission): Observable<Order> {
    const mockOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [],
      total: orderData.items.reduce((sum, item) => sum + (item.quantity * 10), 0),
      customerInfo: orderData.customerInfo,
      deliveryInfo: orderData.deliveryInfo,
      status: 'pending',
      createdAt: new Date(),
      orderNumber: 'NOXA' + Date.now().toString().substr(-6)
    };
    
    return of(mockOrder);
  }

  getOrders(): Observable<Order[]> {
    const mockOrders: Order[] = [
      {
        id: '1',
        items: [{ foodItem: { id: '1', name: 'Margherita Pizza', description: '', price: 12.99, category: 'pizza' }, quantity: 1 }],
        total: 12.99,
        customerInfo: { fullName: 'Sarah Lee', email: 'sarah@example.com', phoneNumber: '123-456-7890' },
        deliveryInfo: { streetAddress: '123 Main St', city: 'New York', zipCode: '10001' },
        status: 'approved',
        createdAt: new Date('2024-10-26T09:45:00'),
        orderNumber: 'NOXA12345'
      },
      {
        id: '2',
        items: [{ foodItem: { id: '2', name: 'Chicken Caesar Salad', description: '', price: 9.50, category: 'salad' }, quantity: 1 }],
        total: 9.50,
        customerInfo: { fullName: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7891' },
        deliveryInfo: { streetAddress: '456 Oak St', city: 'New York', zipCode: '10002' },
        status: 'pending',
        createdAt: new Date('2024-10-26T10:30:00'),
        orderNumber: 'NOXA12346'
      }
    ];
    
    return of(mockOrders);
  }

  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    const mockOrder: Order = {
      id: orderId,
      items: [],
      total: 0,
      customerInfo: { fullName: '', email: '', phoneNumber: '' },
      deliveryInfo: { streetAddress: '', city: '', zipCode: '' },
      status: status as any,
      createdAt: new Date()
    };
    
    return of(mockOrder);
  }
}