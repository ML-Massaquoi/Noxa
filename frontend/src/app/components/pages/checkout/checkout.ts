import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { ApiService } from '../../../services/api.service';
// Import the necessary models
import { OrderRequest, Order, OrderItem } from '../../../models/order.model'; 
import { lastValueFrom } from 'rxjs';
import { TempDataService } from '../../../services/temp-data.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  public cartService = inject(CartService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private tempDataService = inject(TempDataService);
  
  checkoutForm!: FormGroup;
  isSubmitting = signal(false);

  ngOnInit() {
    this.initializeForm();
    // Optional: Redirect if the cart is empty
    if (this.cartService.itemCount() === 0) {
      this.router.navigate(['/cart']);
    }
  }

  private initializeForm() {
    this.checkoutForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  async placeOrder() {
    if (this.checkoutForm.valid) {
      this.isSubmitting.set(true);
      try {
        // Map the cart items to the OrderItem structure defined in your model
        const orderItems: OrderItem[] = this.cartService.getItems().map(item => ({
          menuItemId: item.foodItem.id, // This MUST be a number (assuming your services are fixed now)
          quantity: item.quantity
        }));

        const orderRequest: OrderRequest = {
          customerName: this.checkoutForm.value.customerName,
          address: this.checkoutForm.value.address,
          phone: this.checkoutForm.value.phone,
          items: orderItems,
        };
        console.log('Sending order data:', orderRequest);

        // Assuming apiService.placeOrder returns an observable of type Order (the full response model)
        const order = await lastValueFrom(this.apiService.placeOrder(orderRequest));

        this.cartService.clearCart();

        const confirmationDetails = {
          orderId: order?.id,
          totalPrice: order?.totalPrice,
        };

        this.tempDataService.setLastOrder(confirmationDetails);

        this.router.navigate(['/confirmation']);

      } catch (error) {
        console.error('Order failed:', error);
        alert('Failed to place order. Please check your details and try again.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      this.checkoutForm.get(key)?.markAsTouched();
    });
  }
}
