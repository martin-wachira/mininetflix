import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IMovie } from './../movies/movie';
import { catchError, tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private dbPath = '/movies';
  moviesRef: AngularFireList<IMovie> = null;

  constructor(private http: HttpClient, public fs: AngularFirestore, private db: AngularFireDatabase) {
    this.moviesRef = db.list(this.dbPath);
   }


  getAllMovies(){
    return this.fs.collection('movies').snapshotChanges();
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

  // likeMovie(item){
  //   this.favItem.push(item);
  // }
}
