import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItem } from '../../models/food-item.model';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-card.html' // Links to the HTML above
})
export class FoodCardComponent {
  @Input() foodItem!: FoodItem;
  @Output() addToCart = new EventEmitter<FoodItem>();

  // This is the function the HTML above calls
  onAddToCart() {
    this.addToCart.emit(this.foodItem);
  }
}
