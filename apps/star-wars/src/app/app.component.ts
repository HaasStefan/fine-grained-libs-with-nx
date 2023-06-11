import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@ng-example/shared/dumb-components/navbar';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'ng-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
