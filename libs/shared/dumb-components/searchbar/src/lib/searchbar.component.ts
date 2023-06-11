import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { primengModules } from '@ng-example/shared/utils/primeng';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ng-example-shared-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primengModules],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  @Output() search = new EventEmitter<string>();
  readonly control = this.fb.nonNullable.control('');
  readonly search$ = this.control.valueChanges.pipe(
    debounceTime(800),
    distinctUntilChanged(),
    takeUntilDestroyed()
  );

  ngOnInit() {
    this.search$.subscribe((value) => this.search.emit(value));
  }
}
