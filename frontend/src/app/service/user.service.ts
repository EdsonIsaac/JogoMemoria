import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  findByUsername (username: string): Observable<User> {
    return this.http.get<User>(environment.serverURL + '/users/find?username=' + username);
  }

  findAll (): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.serverURL + '/users');
  }

  save (user: User): Observable<User> {
    return this.http.post<User>(environment.serverURL + '/users', user);
  }

  update (user: User): Observable<User> {
    return this.http.put<User>(environment.serverURL + '/users/' + user.id, user);
  }

  delete (user: User): Observable<User> {
    return this.http.delete<User>(environment.serverURL + '/users/' + user.id);
  }
}
