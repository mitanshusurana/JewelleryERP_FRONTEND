import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ProductService, FormField } from '../../core/services/product.service';
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
    DynamicFormComponent, // Import our new dynamic form
    MatProgressSpinnerModule // For loading indicator
  ],
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements AfterViewInit {
  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;

  // State management
  qrCodeScanned = false;
  scannedQrCode: string | null = null;
  productTypeSelected: ProductType | null = null;
  isLoadingSchema = false;
  formSchema: FormField[] = [];

  ProductType = ProductType;

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    // Start the scanner only if a code hasn't been scanned yet
    if (!this.qrCodeScanned) {
        this.scanner.start();
    }
  }

  onQrCodeScanned(result: ScannerQRCodeResult[]): void {
    if (result && result.length > 0 && result[0].value) {
        const qrCode = result[0].value;
        this.scannedQrCode = qrCode;
        this.qrCodeScanned = true;
        this.scanner.stop();
    }
  }

  selectProductType(type: ProductType): void {
    this.productTypeSelected = type;
    this.isLoadingSchema = true;
    this.formSchema = []; // Clear previous schema

    this.productService.getFormSchema(type).subscribe(schema => {
      this.formSchema = schema;
      this.isLoadingSchema = false;
    });
  }

  onFormSubmitted(formData: any): void {
    console.log('Form Submitted! Preparing to save data.');
    const finalProductData = {
      qrCode: this.scannedQrCode,
      productType: this.productTypeSelected,
      ...formData
    };
    console.log('Final Product Data:', finalProductData);
    // TODO: Implement the call to the product service to save the data
    // this.productService.createProduct(finalProductData).subscribe(res => ...);
    alert('Product data captured! Check the browser console for details.');
  }
}
