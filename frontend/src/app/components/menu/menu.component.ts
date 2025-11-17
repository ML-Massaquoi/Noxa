import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<parameter name="Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem, CartItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Pizza', 'Salads', 'Desserts', 'Burgers'];
  cartItemCount: number = 0;

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getItemCount();
    });
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
      }
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredItems(): MenuItem[] {
    if (this.selectedCategory === 'All') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => 
      item.category.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  addToCart(item: MenuItem): void {
    const cartItem: CartItem = { ...item, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
