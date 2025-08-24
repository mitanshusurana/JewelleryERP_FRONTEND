import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductType } from '../../features/product-creation/product-creation.component';
import { environment } from '../../../environments/environment';

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

// Interface for the final payload to be sent to the backend
export interface CreateProductPayload {
    qrCodeId: string;
    productType: ProductType;
    attributes: { [key: string]: any };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl; // Use the environment variable

  constructor(private http: HttpClient) { }

  // This method now sends the product data to the backend API
  createProduct(payload: CreateProductPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, payload);
  }

  getFormSchema(productType: ProductType): Observable<FormField[]> {
    // In a real app, this would also be an HTTP call
    // return this.http.get<FormField[]>(`${this.apiUrl}/schemas/${productType}`);

    // Mock data for now
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
        ];
    }
    return of(mockSchema).pipe(delay(500));
  }
}
