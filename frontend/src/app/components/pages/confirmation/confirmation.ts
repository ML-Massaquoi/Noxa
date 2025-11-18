// confirmation.component.ts

import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TempDataService } from '../../../services/temp-data.service'; // Import the new service

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe], 
  templateUrl: './confirmation.html'
})
export class ConfirmationComponent implements OnInit {
  private router = inject(Router);
  private tempDataService = inject(TempDataService); // Inject the service
  
  orderNumber = signal<string | undefined>(undefined);
  // ... other signals ...
  orderId = signal<string | undefined>(undefined);
  totalPrice = signal<number | undefined>(undefined);
  paymentMethod = signal<string | undefined>(undefined);

  ngOnInit() {
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    // *** FIX: Get data from the service ***
    const details = this.tempDataService.getLastOrder();
    
    if (details && details.orderNumber) {
      this.orderNumber.set(details.orderNumber);
      this.orderId.set(details.orderId);
      this.totalPrice.set(details.totalPrice);
      this.paymentMethod.set(details.paymentMethod);
      
      // Optional: Clear the data in the service once it's used
      this.tempDataService.clearLastOrder(); 
      
    } else {
      console.warn('No order details found in TempDataService. Redirecting to menu.');
      // If the user refreshes the page, the service data is lost, so we redirect.
      this.router.navigate(['/menu']);
    }
  }
}
