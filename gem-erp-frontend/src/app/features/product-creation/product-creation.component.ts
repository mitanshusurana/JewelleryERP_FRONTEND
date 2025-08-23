import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
// CORRECTED IMPORT: NgxScannerQrcodeModule is removed as it's no longer needed for standalone components.
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

// Define an enum for our product types for type safety
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
    MatStepperModule,
    NgxScannerQrcodeComponent // CORRECTED: Import the component directly instead of the module
  ],
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements AfterViewInit {
  // Get a reference to the scanner component in the template
  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;

  // State management for the workflow
  qrCodeScanned = false;
  scannedQrCode: string | null = null;
  productTypeSelected: ProductType | null = null;

  // Expose the enum to the template
  ProductType = ProductType;

  // This lifecycle hook runs after the view is initialized
  ngAfterViewInit(): void {
    // We can start the scanner automatically here if we want
    this.scanner.start();
  }

  // This function is called by the scanner component when a QR code is successfully read
  onQrCodeScanned(result: ScannerQRCodeResult[]): void {
    // The library can sometimes emit empty results, so we check for a value.
    if (result && result.length > 0 && result[0].value) {
        const qrCode = result[0].value;
        this.scannedQrCode = qrCode;
        this.qrCodeScanned = true;
        console.log(`QR Code Scanned: ${this.scannedQrCode}`);
        // Stop the scanner and camera once we have a result
        this.scanner.stop();
    }
  }

  // Function to handle the selection of a product type
  selectProductType(type: ProductType): void {
    this.productTypeSelected = type;
    console.log(`Product Type Selected: ${this.productTypeSelected}`);
  }
}
