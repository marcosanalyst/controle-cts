import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ ESSENCIAL para standalone
  imports: [RouterModule], // ✅ importa routerLink e router-outlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ aqui é "styleUrls" com "s"
})
export class AppComponent {
  title = 'cadastro-casos-teste';
}
