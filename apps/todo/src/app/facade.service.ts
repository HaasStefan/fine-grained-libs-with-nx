import { computed, Injectable, Provider, signal } from '@angular/core';

interface State {
  someProp: unknown;
}

const initialState: Readonly<State> = {
  someProp: null,
};

type FactoryFn = () => Provider[];
export const provideFacadeService = (
  factory: FactoryFn = () => [FacadeService]
): Provider[] => [
  {
    provide: FacadeService,
    useFactory: () => factory(),
  },
];

@Injectable()
export class FacadeService {
  private readonly stateSignal = signal(initialState);
  public readonly somePropSignal = computed(() => this.stateSignal().someProp);
}
