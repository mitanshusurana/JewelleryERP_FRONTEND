import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormField } from '../../../core/services/product.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() schema: FormField[] = [];
  // Output an event when the form is submitted
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formControls: { [key: string]: any } = {};
    this.schema.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      // Use `null` for number fields to ensure they are treated as numbers, not strings.
      const initialValue = field.type === 'number' ? null : '';
      formControls[field.key] = [initialValue, validators];
    });
    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched(); // Mark all fields as touched to display validation errors
      console.log('Form is invalid');
    }
  }
}
