import { Injectable, signal } from '@angular/core';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodItems = signal<FoodItem[]>([]);

  constructor() {
    this.initializeFoodItems();
  }

  private initializeFoodItems() {
    const items: FoodItem[] = [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
        price: 12.99,
        category: 'pizza',
        ingredients: ['Mozzarella', 'Tomatoes', 'Basil', 'Pizza Dough'],
        preparationTime: 20,
        isAvailable: true
      },
      {
        id: '2',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing.',
        price: 9.50,
        category: 'salad',
        ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'],
        preparationTime: 10,
        isAvailable: true
      },
      {
        id: '3',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        price: 7.00,
        category: 'dessert',
        ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar'],
        preparationTime: 15,
        isAvailable: true
      },
      {
        id: '4',
        name: 'Classic Burger',
        description: 'A savory beef patty topped with cheddar cheese, fresh lettuce, and tomato.',
        price: 11.25,
        category: 'burger',
        ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Bun'],
        preparationTime: 12,
        isAvailable: true
      }
    ];
    
    this.foodItems.set(items);
  }

  async getFoodItems(): Promise<FoodItem[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.foodItems());
      }, 500);
    });
  }

  getFoodItemById(id: string): FoodItem | undefined {
    return this.foodItems().find(item => item.id === id);
  }
}