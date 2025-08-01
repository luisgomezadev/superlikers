import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { KpisComponent } from './features/kpis/kpis.component';
import { authGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'kpis', component: KpisComponent, canActivate: [authGuard] }
];
