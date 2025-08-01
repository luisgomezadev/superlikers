import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  nombreCompleto = '';
  codigoCliente = '';
  email = '';
  genero = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit():void {
    this.authService.register(this.email, this.genero, this.nombreCompleto, this.codigoCliente).subscribe({
        next: (res) => {
        Swal.fire({
          title: "Registrado",
          text: res.message,
          icon: "success"
        });
          this.router.navigate(['/']);
        }, error: (err) => {
          Swal.fire({
            title: "Error",
            text: err.error.message || 'Error al registrar participante',
            icon: "error"
          });
        }
      })
    }

}
