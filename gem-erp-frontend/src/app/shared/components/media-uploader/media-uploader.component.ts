import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-media-uploader',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './media-uploader.component.html',
  styleUrls: ['./media-uploader.component.scss']
})
export class MediaUploaderComponent {
  // Emits the file that the user has selected
  @Output() fileSelected = new EventEmitter<File>();

  selectedFile: File | null = null;
  uploadProgress: number | null = null;

  // This method is triggered when the user selects a file from the input
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.fileSelected.emit(this.selectedFile);
      // For demonstration, we'll simulate an upload progress
      this.simulateUpload();
    }
  }

  // Simulates a file upload to show progress
  private simulateUpload(): void {
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      if (this.uploadProgress === null) {
        this.uploadProgress = 0;
      }
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        this.uploadProgress = 100;
        clearInterval(interval);
      }
    }, 200);
  }

  // Allows the user to clear the selected file
  clearFile(): void {
    this.selectedFile = null;
    this.uploadProgress = null;
    this.fileSelected.emit(undefined);
  }
}
