// src/app/services/temp-data.service.ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempDataService {
  // Use signals to temporarily store the last order details
  private lastOrderDetails = signal<any | null>(null);

  setLastOrder(details: any) {
    this.lastOrderDetails.set(details);
  }

  getLastOrder() {
    return this.lastOrderDetails();
  }

  clearLastOrder() {
    this.lastOrderDetails.set(null);
  }
}
