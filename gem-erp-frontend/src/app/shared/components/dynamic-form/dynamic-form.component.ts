import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormField } from '../../../core/services/product.service';
import { MediaUploaderComponent } from '../media-uploader/media-uploader.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MediaUploaderComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() schema: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formControls: { [key:string]: any } = {};
    this.schema.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      const initialValue = field.type === 'number' ? null : (field.type === 'media' ? null : '');
      formControls[field.key] = [initialValue, validators];
    });
    this.form = this.fb.group(formControls);
  }

  onFileSelected(file: File, fieldKey: string): void {
    this.form.get(fieldKey)?.setValue(file);
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Before submitting, we can process the form value if needed
      // For example, if we were uploading the file here, we would handle the multipart form data
      console.log('Submitting form:', this.form.value);
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      console.error('Form is invalid.');
    }
  }
}
