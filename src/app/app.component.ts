import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomToastComponent } from "./shared/components/custom-toast/custom-toast.component";
import { ToastModule } from 'primeng/toast';
import { ToastService } from './core/services/toast-service/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomToastComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'skillspace-resume-builder';

  constructor(public toastService: ToastService){ }
}
