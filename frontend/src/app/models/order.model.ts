export interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
}

export interface OrderCreateRequest {
  street: string;
  aptSuite?: string;
  city: string;
  zip: string;
  specialInstructions?: string;
  items: OrderItemRequest[];
}

export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface OrderItemResponse {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemResponse[];
}
