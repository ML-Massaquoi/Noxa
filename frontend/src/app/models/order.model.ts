export interface OrderItem {
  menuItemId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  address: string;
  phone: string;
  totalPrice: number;
  status: OrderStatus;
  items: OrderItem[];
}

export type OrderStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELIVERED' | 'PREPARING' | 'READY';

export interface OrderRequest {
  customerName: string;
  address: string;
  phone: string;
  items: OrderItem[];
}