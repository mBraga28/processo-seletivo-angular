import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, retry } from 'rxjs';
import { ClincDTO } from '../dtos/clinc.dto';

@Injectable({
  providedIn: 'root'
})
export class ClincService {

  constructor(private http: HttpClient) { }

  // TODO: Mapear DTOs para retorno do Backend
  getAllClincs(): Observable<ClincDTO[]> {
    return this.http.get<ClincDTO[]>(`${environment.API_URL}/clinc`).pipe(retry(1));
  }

  createClinc(clincData: ClincDTO): Observable<ClincDTO> {
    return this.http.post<ClincDTO>(`${environment.API_URL}/clinc`, clincData).pipe(retry(1));
  }

  updateClinc(id: number, clinicData: ClincDTO): Observable<ClincDTO> {
    const updateUrl = `${environment.API_URL}/clinc/${id}`;
    return this.http.put<ClincDTO>(updateUrl, clinicData).pipe(retry(1));
  }

  deleteClinc(id: number): Observable<any> {
    const deleteUrl = `${environment.API_URL}/clinc/${id}`;
    return this.http.delete<any>(deleteUrl).pipe(retry(1));
  }

}
