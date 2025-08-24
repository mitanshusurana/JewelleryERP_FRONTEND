import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Dashboard</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Welcome to the Gemstone ERP. Your main dashboard content will be displayed here.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class DashboardComponent {}
