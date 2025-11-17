import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  public cartService = inject(CartService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  checkoutForm!: FormGroup;
  isSubmitting = signal(false);

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      streetAddress: ['', Validators.required],
      aptSuite: [''],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      specialInstructions: ['']
    });
  }

  async placeOrder() {
    if (this.checkoutForm.valid) {
      this.isSubmitting.set(true);
      try {
        const orderData = {
          customerInfo: {
            fullName: this.checkoutForm.value.fullName,
            email: this.checkoutForm.value.email,
            phoneNumber: this.checkoutForm.value.phoneNumber
          },
          deliveryInfo: {
            streetAddress: this.checkoutForm.value.streetAddress,
            aptSuite: this.checkoutForm.value.aptSuite,
            city: this.checkoutForm.value.city,
            zipCode: this.checkoutForm.value.zipCode,
            specialInstructions: this.checkoutForm.value.specialInstructions
          },
          items: this.cartService.getItems().map(item => ({
            foodItemId: item.foodItem.id,
            quantity: item.quantity
          }))
        };
        
        const order = await this.apiService.placeOrder(orderData).toPromise();
        this.cartService.clearCart();
        
        this.router.navigate(['/confirmation'], { 
          state: { orderId: order?.id, orderNumber: order?.orderNumber } 
        });
      } catch (error) {
        console.error('Order failed:', error);
        alert('Failed to place order. Please try again.');
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