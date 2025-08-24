import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ProductService, FormField, CreateProductPayload } from '../../core/services/product.service';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';

export enum ProductType {
  LooseGemstone = 'LOOSE_GEMSTONE',
  FinishedJewelry = 'FINISHED_JEWELRY',
  IdolCarving = 'IDOL_CARVING'
}

@Component({
  selector: 'app-product-creation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxScannerQrcodeComponent,
    DynamicFormComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent {
  // Use a setter for ViewChild. This code runs the moment the scanner component is ready.
  @ViewChild('action')
  set scanner(scanner: NgxScannerQrcodeComponent) {
    if (scanner && !this.qrCodeScanned) {
      scanner.start();
    }
  }

  qrCodeScanned = false;
  scannedQrCode: string | null = null;
  productTypeSelected: ProductType | null = null;
  isLoadingSchema = false;
  isSaving = false;
  formSchema: FormField[] = [];

  ProductType = ProductType;

  constructor(private productService: ProductService) {}

  // The 'scanner' parameter is passed directly from the template to ensure we're acting on the correct instance.
  onQrCodeScanned(result: ScannerQRCodeResult[], scanner: NgxScannerQrcodeComponent): void {
    if (result && result.length > 0 && result[0].value) {
        this.scannedQrCode = result[0].value;
        this.qrCodeScanned = true;
        scanner.stop(); // Stop the specific scanner instance
    }
  }

  selectProductType(type: ProductType): void {
    this.productTypeSelected = type;
    this.isLoadingSchema = true;
    this.formSchema = [];
    this.productService.getFormSchema(type).subscribe(schema => {
      this.formSchema = schema;
      this.isLoadingSchema = false;
    });
  }

  onSaveProduct(formData: any): void {
    console.log('Form Submitted! Preparing to save data.');
    this.isSaving = true;

    const payload: CreateProductPayload = {
      qrCodeId: this.scannedQrCode!,
      productType: this.productTypeSelected!,
      attributes: formData
    };

    console.log('Final Product Data:', payload);

    this.productService.createProduct(payload).subscribe({
      next: (response) => {
        console.log('Product saved successfully!', response);
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error saving product:', err);
        this.isSaving = false;
      }
    });
  }
}
