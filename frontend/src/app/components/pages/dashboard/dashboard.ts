import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Order, OrderStatus } from '../../../models/order.model';
import { lastValueFrom } from 'rxjs'; // Import lastValueFrom

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
// ... (component properties are the same)
  private apiService = inject(ApiService);

  orders = signal<Order[]>([]);
  filteredOrders = signal<Order[]>([]);
  isLoading = signal(true);
  searchTerm = signal('');
  selectedStatus = signal<OrderStatus | 'all'>('all');

  submissionsToday = signal(0);
  pendingReview = signal(0);

  async ngOnInit() {
    await this.loadOrders();
    this.calculateStats();
  }

  private async loadOrders() {
    try {
      this.isLoading.set(true);
      // FIX 1: Add type assertion or use lastValueFrom
      const orders = await lastValueFrom(this.apiService.getOrders());
      this.orders.set(orders || []);
      this.filteredOrders.set(orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
// ... (calculateStats, onSearchChange, onStatusChange, filterOrders methods are the same)

  private calculateStats() {
    // ... same logic ...
  }

  onSearchChange(term: string) {
    // ... same logic ...
  }

  onStatusChange(status: OrderStatus | 'all') {
    // ... same logic ...
  }

  private filterOrders() {
    // ... same logic ...
  }


  async updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      // FIX 2: Add type assertion or use lastValueFrom
      await lastValueFrom(this.apiService.updateOrderStatus(orderId, status));
      await this.loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }
// ... (getStatusColor method is the same)
  getStatusColor(status: OrderStatus): string {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  }
}
