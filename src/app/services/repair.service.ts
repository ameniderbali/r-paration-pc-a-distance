import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Repair {
  id?: number;
  name: string;
  email: string;
  phone: string;
  problem: string;
  status?: string;
  teamviewerId?: string;
  teamviewerPassword?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private apiUrl = 'http://localhost:8080/api/repairs';

  constructor(private http: HttpClient) { }

  createRepair(repair: Repair): Observable<Repair> {
    return this.http.post<Repair>(this.apiUrl, repair);
  }

  getRepairs(): Observable<Repair[]> {
    return this.http.get<Repair[]>(this.apiUrl);
  }
  updateRemoteAccess(
  id: number,
  remoteInfo: { teamviewerId: string; teamviewerPassword: string }
):Observable<Repair> {
  return this.http.put<Repair>(`${this.apiUrl}/${id}/remote`, remoteInfo);
}
updateStatus(id: number): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}/status`, {});
}

deleteRepair(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}
}
