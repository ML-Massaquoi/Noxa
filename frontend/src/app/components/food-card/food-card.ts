import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItem } from '../../models/food-item.model';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-card.html'
})
export class FoodCardComponent {
  @Input() foodItem!: FoodItem;
  @Output() addToCart = new EventEmitter<FoodItem>();

  onAddToCart() {
    this.addToCart.emit(this.foodItem);
  }
}