import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';
import { FoodItem } from '../../../models/food-item.model';
import { FoodCardComponent } from '../../../components/food-card/food-card';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, FoodCardComponent],
  templateUrl: './menu.html' // uses the modern HTML above
})
export class MenuComponent implements OnInit {
  private foodService = inject(FoodService);
  cartService = inject(CartService);
  
  foodItems = signal<FoodItem[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    await this.loadFoodItems();
  }

  private async loadFoodItems() {
    try {
      this.isLoading.set(true);
      // These items were hardcoded in your image/original code description
      // but in this version, they are loaded via your service:
      const items = await this.foodService.getFoodItems(); 
      this.foodItems.set(items);
    } catch (error) {
      console.error('Error loading food items:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  addToCart(item: FoodItem) {
    this.cartService.addItem(item);
  }
}
