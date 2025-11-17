import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Order, OrderStatus } from '../../../models/order.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
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
      const orders = await this.apiService.getOrders().toPromise();
      this.orders.set(orders || []);
      this.filteredOrders.set(orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private calculateStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySubmissions = this.orders().filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    this.submissionsToday.set(todaySubmissions.length);
    this.pendingReview.set(this.orders().filter(order => order.status === 'pending').length);
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.filterOrders();
  }

  onStatusChange(status: OrderStatus | 'all') {
    this.selectedStatus.set(status);
    this.filterOrders();
  }

  private filterOrders() {
    let filtered = this.orders();

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(order =>
        order.customerInfo.fullName.toLowerCase().includes(term) ||
        order.items.some(item => item.foodItem.name.toLowerCase().includes(term)) ||
        order.id.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus() !== 'all') {
      filtered = filtered.filter(order => order.status === this.selectedStatus());
    }

    this.filteredOrders.set(filtered);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      await this.apiService.updateOrderStatus(orderId, status).toPromise();
      await this.loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

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