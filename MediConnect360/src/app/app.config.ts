import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule,Router,CommonModule ) 
  ]
};
