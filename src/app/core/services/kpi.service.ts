import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Kpi {
  nombre: string;
  meta_mes_hectolitros: number;
  meta_mes_cartones: number;
  avance_actual_hectolitros: number;
  avance_actual_cartones: number;
  porcentaje_hectolitros: number;
  porcentaje_cartones: number;
}

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http: HttpClient) { }

  getKpis(): Observable<Kpi[]> {
    const body = {
      campaign: environment.campaign,
      api_key: environment.apiKey,
      date_filter: {
        sdate: "2024-08-01",
        edate: "2024-08-31"
      },
      _type: "External",
      atype: "avance_metas",
    };

    return this.http.post<any>('/api/entries/index', body).pipe(
      map(res => {
        const data = res.data.entries[4]?.data || {};

        const grupo: Record<string, Record<string, any>> = {};

        Object.entries(data).forEach(([llave, valor]) => {
          const match = llave.match(/^(.*)_(avance_actual|meta_mes)_(hectolitros|cartones)$/);
          if (!match) return;

          const [_, nombre, tipo, unidad] = match;
          const tipoUnidad = `${tipo}_${unidad}`;

          if (!grupo[nombre]) {
            grupo[nombre] = {};
          }

          grupo[nombre][tipoUnidad] = parseFloat(valor as string) || 0;
        });

        return Object.entries(grupo)
          .filter(([_, valor]) =>
            'meta_mes_hectolitros' in valor &&
            'meta_mes_cartones' in valor
          )
          .map(([nombre, valor]) => {
            const metaH = valor['meta_mes_hectolitros'];
            const metaC = valor['meta_mes_cartones'];
            const avanceH = valor['avance_actual_hectolitros'] ?? 0;
            const avanceC = valor['avance_actual_cartones'] ?? 0;

            return {
              nombre,
              meta_mes_hectolitros: metaH,
              meta_mes_cartones: metaC,
              avance_actual_hectolitros: avanceH,
              avance_actual_cartones: avanceC,
              porcentaje_hectolitros: metaH ? Math.round((avanceH / metaH) * 100) : 0,
              porcentaje_cartones: metaC ? Math.round((avanceC / metaC) * 100) : 0,
            };
          });
      })
    );
  }
}
