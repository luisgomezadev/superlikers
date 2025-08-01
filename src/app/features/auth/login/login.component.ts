import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '12222222';
  password = '123456789';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit():void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/kpis']);
      }, error: (err) => {
        Swal.fire({
          title: "Error",
          text: err.error.message || 'Credenciales incorrectas',
          icon: "error"
        });
      }
    })
  }

  register() {
    this.router.navigate(['/register'])
  }

}
