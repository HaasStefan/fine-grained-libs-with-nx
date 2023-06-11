import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {
  PeopleFacadeService,
  providePeopleFacadeService,
} from '@ng-example/people/facades/people';
import { lastValueFrom } from 'rxjs';

export const peopleRoutes: Routes = [
  {
    path: 'people',
    providers: [providePeopleFacadeService()],
    resolve: {
      people: async () => {
        const facade = inject(PeopleFacadeService);
        return await lastValueFrom(facade.loadPeople());
      }
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search',
      },
      {
        path: 'search',
        loadComponent: async () =>
          (await import('@ng-example/people/smart-components/search'))
            .SearchComponent,
      },
    ],
  },
];
