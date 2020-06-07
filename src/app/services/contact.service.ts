import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url: string = 'https://localhost:44385/api';
  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Array<IContact>> {
    return this.http.get<Array<IContact>>(`${this.url}/Contact/get-contacts`);
  }

  public getContact(id: number): Observable<IContact> {
    return this.http.get<IContact>(`${this.url}/Contact/get-contact?contactId=${id}`);
  }

  public createContact(contact: IContact): Observable<any> {
    return this.http.post<any>(`${this.url}/Contact/add-contact`, contact);
  }

  public updateContact(contact: IContact): Observable<any> {
    return this.http.post<any>(`${this.url}/Contact/update-contact`, contact);
  }

  public deleteContact(id: number): Observable<any> {
    return this.http.post<any>(`${this.url}/Contact/delete-contact?contactId=${id}`, {});
  }
}
