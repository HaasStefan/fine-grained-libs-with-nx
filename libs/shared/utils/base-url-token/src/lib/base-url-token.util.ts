import { InjectionToken } from '@angular/core';

export const BaseUrlToken = new InjectionToken<string>('baseUrl', {
  providedIn: 'root',
  factory: () => 'https://swapi.dev/api/',
});
