import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { primengModules } from '@ng-example/shared/utils/primeng';
import { Person } from '@ng-example/shared/models/person';

@Component({
  selector: 'ng-example-people-table',
  standalone: true,
  imports: [CommonModule, ...primengModules],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly peopleSignal = signal<Person[]>([]);
  @Input({ required: true }) set people(value: Person[]) {
    this.peopleSignal.set(value);
  }
}
