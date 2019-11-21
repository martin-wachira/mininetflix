import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { IMovie } from './../movies/movie';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user: Observable<firebase.User>;

  movieCollection: AngularFirestoreCollection<IMovie>;
  movies: Observable<IMovie[]>;
  movieDoc: AngularFirestoreDocument<IMovie>;

  newUser: any;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    private http: HttpClient, 
    public fs: AngularFirestore, 
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router) {

    this.movieCollection = this.fs.collection('movies', ref => ref.orderBy('title', 'asc'));

    this.movies = this.movieCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IMovie;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getAllMovies() {
    return this.movies;
  }

  getMovie(id: string): Observable<IMovie | undefined>{
    return this.getAllMovies()
    .pipe(
        map((movies: IMovie[]) => movies.find(m => m.id === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An Error Occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server Returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  // submitRegister(body: any) {
  //   return this.http.post('http://localhost:3000/users/register', body, {
  //     observe: 'body'
  //   });
  // }

  // login(body: any) {
  //   return this.http.post('http://localhost:3000/users/login', body, {
  //     observe: 'body'
  //   });
  // }

  // getUserName() {
  //   return this.http.get('http://localhost:3000/users/username', {
  //     observe: 'body',
  //     params: new HttpParams().append('token', localStorage.getItem('token'))
  //   });
  // }

  // createUser(user) {
  //   console.log(user);
  //   this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
  //   .then( userCred  => {      
  //     this.newUser = user;
  //     console.log(userCred);
  //     userCred.user.updateProfile({
  //       displayName: user.username
  //     });

  //     this.insertUser(userCred)
  //     .then(() => {
  //       this.router.navigate(['/register']);
  //     });
  //   })

  //   .catch( error =>{
  //     this.eventAuthError.next(error);
  //   });
  // }
  // insertUser(userCred: firebase.auth.UserCredential) {
  //  return this.fs.doc(`users/${userCred.user.uid}`).set({
  //    email: this.newUser.email,
  //    username: this.newUser.username,
  //    role: 'Admin'
  //  })
  // }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        alert('Bingo, You are logged in!');
        this.router.navigate(['register']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        // this.router.navigate(['register']);
      });
  }

  signup(email: string, password: string){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      value => {
        alert('User Registration successfull');
        console.log('Success!', value);
        this.router.navigate(['dashboard']);
      }
    ).catch( err => {
      console.log('Something went wrong:',err.message);
    })
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['sign-in']);
  }

}
