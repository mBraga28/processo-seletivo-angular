import { Injectable } from '@angular/core';
import { UserDTO } from '../dtos/user.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // TODO: Mapear DTOs para retorno do Backend
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${environment.API_URL}/users`).pipe(retry(1));
  }

  getUserById(id: number): Observable<UserDTO> {
    const getUserUrl = `${environment.API_URL}/users/${id}`;
    return this.http.get<UserDTO>(getUserUrl).pipe(retry(1));
  }

  getUserByCpf(cpf: string): Observable<UserDTO> {
    const getUserUrl = `${environment.API_URL}/users/cpf/${cpf}`;
    return this.http.get<UserDTO>(getUserUrl).pipe(retry(1));
  }

  createUser(userData: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${environment.API_URL}/users`, userData).pipe(retry(1));
  }

  updateUser(id: number, clinicData: UserDTO): Observable<UserDTO> {
    const updateUrl = `${environment.API_URL}/users/${id}`;
    return this.http.put<UserDTO>(updateUrl, clinicData).pipe(retry(1));
  }

  deleteUser(id: number): Observable<any> {
    const deleteUrl = `${environment.API_URL}/users/${id}`;
    return this.http.delete<any>(deleteUrl).pipe(retry(1));
  }

}
