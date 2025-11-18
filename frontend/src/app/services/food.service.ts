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
        id: 1, // Changed from '1' to 1 (number)
        name: 'Cassava Leaves',
        description: 'Delicious Sierra Leonean cassava leaf stew cooked with palm oil, smoked fish, and meat.',
        price: 25.00,
        category: 'local',
        ingredients: ['Cassava Leaves', 'Palm Oil', 'Meat', 'Fish', 'Seasoning'],
        preparationTime: 40,
        isAvailable: true,
        imageUrl: 'Cassava-Leaf-Stew-4.jpg'
      },
      {
        id: 2, // Changed from '2' to 2 (number)
        name: 'Potato Leaves',
        description: 'A popular Sierra Leonean leafy stew prepared with palm oil, spices, meat, and fish.',
        price: 25.00,
        category: 'local',
        ingredients: ['Potato Leaves', 'Palm Oil', 'Fish', 'Meat', 'Onions', 'Seasoning'],
        preparationTime: 35,
        isAvailable: true,
        imageUrl: 'potato_leaf_stew.jpg'
      },
      {
        id: 3, // Changed from '3' to 3 (number)
        name: 'Jollof Rice',
        description: 'Classic West African jollof rice cooked in tomato stew with spices and vegetables.',
        price: 20.00,
        category: 'rice',
        ingredients: ['Rice', 'Tomato Stew', 'Onions', 'Seasoning', 'Vegetables'],
        preparationTime: 30,
        isAvailable: true,
        imageUrl: 'jolof_rice.jpg'
      },
      {
        id: 4, // Changed from '4' to 4 (number)
        name: 'Groundnut Soup',
        description: 'Rich groundnut (peanut) soup cooked with chicken or meat, served with rice.',
        price: 22.00,
        category: 'soup',
        ingredients: ['Groundnuts', 'Chicken or Meat', 'Onions', 'Seasoning'],
        preparationTime: 45,
        isAvailable: true,
        imageUrl: 'groundnut_stew.jpg'
      },
      {
        id: 5, // Changed from '5' to 5 (number)
        name: 'Fufu with Soup',
        description: 'Traditional Sierra Leonean fufu served with okra or palm oil soup.',
        price: 18.00,
        category: 'traditional',
        ingredients: ['Fufu', 'Okra Soup', 'Palm Oil', 'Fish', 'Seasoning'],
        preparationTime: 30,
        isAvailable: true,
        imageUrl: 'okra_foo_foo.jpeg'
      },
      {
        id: 6, // Changed from '6' to 6 (number)
        name: 'Shawarma',
        description: 'Delicious chicken shawarma wrapped with vegetables, sauce, and spices.',
        price: 20.00,
        category: 'local',
        ingredients: ['Chicken', 'Tortilla Wrap', 'Vegetables', 'Garlic Sauce', 'Seasoning'],
        preparationTime: 35,
        isAvailable: true,
        imageUrl: 'shawarma.jpg'
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

  // The method signature here must be changed to expect a number, not a string
  getFoodItemById(id: number): FoodItem | undefined {
    return this.foodItems().find(item => item.id === id);
  }
}
