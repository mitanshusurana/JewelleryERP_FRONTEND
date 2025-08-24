import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductType } from '../../features/product-creation/product-creation.component';

// Define interfaces for our form schema for strong typing
export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  required: boolean;
  options?: FormFieldOption[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // We will replace this with the real API URL from environments later
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  // This method will fetch the form schema from the backend
  getFormSchema(productType: ProductType): Observable<FormField[]> {
    console.log(`Fetching form schema for: ${productType}`);

    // TODO: Replace this mock data with a real HTTP call
    // return this.http.get<FormField[]>(`${this.apiUrl}/inventory/schemas/${productType}`);

    // --- MOCK DATA FOR NOW ---
    let mockSchema: FormField[] = [];
    if (productType === ProductType.LooseGemstone) {
      mockSchema = [
        { key: 'carat', label: 'Carat Weight', type: 'number', required: true },
        { key: 'color', label: 'Color', type: 'select', required: true, options: [
          { value: 'D', label: 'D' }, { value: 'E', label: 'E' }, { value: 'F', label: 'F' }, { value: 'G', label: 'G' }
        ]},
        { key: 'clarity', label: 'Clarity', type: 'select', required: true, options: [
            { value: 'IF', label: 'Internally Flawless (IF)' }, { value: 'VVS1', label: 'VVS1' }, { value: 'VVS2', label: 'VVS2' }, { value: 'VS1', label: 'VS1' }
        ]},
        { key: 'origin', label: 'Origin', type: 'text', required: false },
      ];
    } else if (productType === ProductType.FinishedJewelry) {
        mockSchema = [
            { key: 'metal_type', label: 'Metal Type', type: 'select', required: true, options: [
                { value: 'GOLD', label: 'Gold' }, { value: 'SILVER', label: 'Silver' }, { value: 'PLATINUM', label: 'Platinum' }
            ]},
            { key: 'gross_weight', label: 'Gross Weight (grams)', type: 'number', required: true },
            { key: 'main_stone_carat', label: 'Main Stone Carat', type: 'number', required: true },
        ];
    }
    // Simulate network delay
    return of(mockSchema).pipe(delay(500));
  }
}
