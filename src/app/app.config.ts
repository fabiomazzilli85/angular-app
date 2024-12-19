import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes'; // Importa le tue route

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Fornisci le route
    provideHttpClient()
  ]
};
