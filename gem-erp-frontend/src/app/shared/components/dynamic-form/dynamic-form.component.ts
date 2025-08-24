import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormField } from 'src/app/core/services/product.service';

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
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() schema: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize with an empty group to avoid "form is undefined" errors before ngOnInit
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Rebuild the form if the schema input changes after initialization
    if (changes['schema'] && !changes['schema'].firstChange) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const formControls: { [key: string]: any } = {};
    this.schema.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      formControls[field.key] = this.fb.control('', validators);
    });
    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      // Mark all fields as touched to display validation errors to the user
      this.form.markAllAsTouched();
    }
  }
}
