import { IMovie } from './movie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // // private url = "";

  // constructor(private http: HttpClient) { }

  // // getMovies(): Observable<IMovie[]> {
  // //   return this.http.get<IMovie[]>(this.url).pipe(
  // //     tap(data => console.log('All: ' + JSON.stringify(data))),
  // //     catchError(this.handleError)
  // //     );
  // // }

  // // getMovie(id: number): Observable<IMovie>{
  // //   return this.getMovies()
  // //   .pipe(
  // //       map((movies: IMovie[]) => {
  // //         return movies.find(m => m.id === id);
  // //       })
  // //   );
  // // }

  // private handleError(err: HttpErrorResponse){
  //   let errorMessage = '';
  //   if(err.error instanceof ErrorEvent){
  //     errorMessage = `An Error Occurred: ${err.error.message}`;
  //   }else{
  //     errorMessage = `Server Returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
