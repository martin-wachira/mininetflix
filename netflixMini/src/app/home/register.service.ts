import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IMovie } from './../movies/movie';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // errMess: any = 'Some Errors';

  constructor(private http: HttpClient) { }


  // getMovies(): Observable<IMovie[]> {
  //   return this.http.get<IMovie[]>('/movies')
  //   .pipe(
  //     tap(data => console.log('All: ' + JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

    getMovies() {
    return this.http.get('http://localhost:3000/movies');
  }

  

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An Error Occurred: ${err.error.message}`;
    }else{
      errorMessage = `Server Returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  submitRegister(body: any) {
    return this.http.post('http://localhost:3000/users/register', body, {
      observe: 'body'
    });
  }

  login(body: any) {
    return this.http.post('http://localhost:3000/users/login', body, {
      observe: 'body'
    });
  }

  getUserName() {
    return this.http.get('http://localhost:3000/users/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
    
  }

}
