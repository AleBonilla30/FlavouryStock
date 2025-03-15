import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users'; 

    constructor(private http: HttpClient) { }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    login(user: User): Observable<User> {
        console.log('Usuario completo recibido:', user);

        const loginData = {
            email: user.email,
            passwd: user.passwd
        };
        console.log('Datos enviados al login:', loginData);
        console.log('¿Email está vacío?', !loginData.email);
        console.log('¿Passwd está vacío?', !loginData.passwd);
        
        return this.http.post<User>(`${this.apiUrl}/login`, loginData).pipe(
            tap(response => console.log('Respuesta completa:', response)),
            catchError(error => {
                console.log('Error completo:', error);
                console.log('Mensaje del backend:', error.error);
                throw error;
            })
        );
    }
} 