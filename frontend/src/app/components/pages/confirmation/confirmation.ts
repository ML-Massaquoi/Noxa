import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.html'
})
export class ConfirmationComponent {
  private router = inject(Router);
  
  orderNumber = this.router.getCurrentNavigation()?.extras.state?.['orderNumber'] || 'NOXA12345';

  constructor() {
    if (!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['/menu']);
    }
  }
}