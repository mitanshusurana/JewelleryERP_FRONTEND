import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// This import MUST point to app.component, not app.ts
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
