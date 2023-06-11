import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlToken } from '@ng-example/shared/utils/base-url-token';
import { Person } from '@ng-example/shared/models/person';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrlToken);

  get() {
    return this.http
      .get<{
        results: Person[];
      }>(`${this.baseUrl}/people`)
      .pipe(map((res) => res.results));
  }
}
