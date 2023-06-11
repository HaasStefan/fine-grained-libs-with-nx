import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleFacadeService } from '@ng-example/people/facades/people';
import { SearchbarComponent } from '@ng-example/shared/dumb-components/searchbar';
import { TableComponent } from '@ng-example/people/dumb-components/table';

@Component({
  selector: 'ng-example-people-search',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, TableComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private readonly facade = inject(PeopleFacadeService);

  readonly peopleSignal = this.facade.peopleSignal;
  readonly searchSignal = signal<string | null>(null);
  readonly filteredPeople = computed(() => {
    const search = this.searchSignal();
    if (!search) return this.peopleSignal();

    return this.peopleSignal().filter((person) =>
      person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });
}
