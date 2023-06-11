import {
  computed,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { PeopleDataService } from '@ng-example/people/data-services/people';
import { Person } from '@ng-example/shared/models/person';
import { tap } from 'rxjs';

interface State {
  people: Person[];
}

const initialState: Readonly<State> = {
  people: [],
};

export const providePeopleFacadeService = (): EnvironmentProviders =>
  makeEnvironmentProviders([PeopleFacadeService]);

@Injectable()
export class PeopleFacadeService {
  private readonly stateSignal = signal(initialState);
  public readonly peopleSignal = computed(() => this.stateSignal().people);

  private readonly peopleDataService = inject(PeopleDataService);

  loadPeople() {
    return this.peopleDataService.get().pipe(
      tap((people) => {
        this.stateSignal.update((state) => ({
          ...state,
          people,
        }));
      })
    );
  }
}
