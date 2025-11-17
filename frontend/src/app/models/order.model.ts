import { FoodItem } from './food-item.model';

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  status: OrderStatus;
  createdAt: Date;
  updatedAt?: Date;
  orderNumber?: string;
}

export interface OrderItem {
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface DeliveryInfo {
  streetAddress: string;
  aptSuite?: string;
  city: string;
  zipCode: string;
  specialInstructions?: string;
  deliveryTime?: Date;
}

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'preparing' | 'ready' | 'delivered';

export interface OrderSubmission {
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  items: Array<{
    foodItemId: string;
    quantity: number;
    specialInstructions?: string;
  }>;
}