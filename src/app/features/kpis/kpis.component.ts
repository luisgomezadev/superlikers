import { Component, OnInit } from '@angular/core';
import { Kpi, KpiService } from '../../core/services/kpi.service';
import { FormsModule } from '@angular/forms';
import { AuthService, Participant } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CircleProgressModule } from '../../modules/circle-progress.module';

@Component({
  selector: 'app-kpis',
  standalone: true,
  imports: [FormsModule, CommonModule, CircleProgressModule],
  templateUrl: './kpis.component.html',
  styleUrl: './kpis.component.css',
})
export class KpisComponent implements OnInit {
  kpis: Kpi[] = [];
  participant!: Participant;
  filtro: 'Cartones' | 'Hectolitros' = 'Cartones';

  constructor(
    private kpiService: KpiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.participant = this.authService.getParticipant();
    this.getKPIs();
  }

  getKPIs() {
    this.kpiService.getKpis().subscribe(kpis => {
      this.kpis = kpis;
    });
  }

  getPorcentaje(kpi: Kpi): number {
    return this.filtro === 'Cartones'
      ? kpi.porcentaje_cartones
      : kpi.porcentaje_hectolitros;
  }

  capitalizar(nombre: string): string {
    return nombre.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

}
