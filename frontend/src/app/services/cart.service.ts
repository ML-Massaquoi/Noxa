import { Injectable, signal, computed } from '@angular/core';
import { FoodItem } from '../models/food-item.model';

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);
  
  itemCount = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0)
  );

  addItem(item: FoodItem) {
    const currentItems = this.items();
    const existingItemIndex = currentItems.findIndex(
      cartItem => cartItem.foodItem.id === item.id
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      this.items.set(updatedItems);
    } else {
      this.items.update(current => [...current, { foodItem: item, quantity: 1 }]);
    }
  }

  removeItem(itemId: string) {
    this.items.update(current => 
      current.filter(cartItem => cartItem.foodItem.id !== itemId)
    );
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    this.items.update(current => 
      current.map(cartItem => 
        cartItem.foodItem.id === itemId 
          ? { ...cartItem, quantity } 
          : cartItem
      )
    );
  }

  clearCart() {
    this.items.set([]);
  }

  getItems(): CartItem[] {
    return this.items();
  }

  getItemCount(): number {
    return this.itemCount();
  }

  getTotalPrice(): number {
    return this.totalPrice();
  }
}