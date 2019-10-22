import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { ActivatedRoute, Router } from '@angular/router'
import { IMovie } from '../movies/movie';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

function passMatch(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('cnfpass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  successMessage = '';
  validatingForm: FormGroup;
  passMessage: string;

  errorMessage = '';

  // _listFilter: string;
  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.filteredMovies = this.listFilter ? this.performFilter(this.listFilter) : this.movies;
  // }

  // filteredMovies: IMovie[];
  movies: IMovie[] = [];

  private validationMessages = {
    required: 'Please enter your password.',
  };

  constructor(private fb: FormBuilder,
    private service: RegisterService,
    private router: Router,
    private a_route: ActivatedRoute,
    private db: AngularFirestore) {}

  // performFilter(filterBy: string): IMovie[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.movies.filter((movie: IMovie) =>
  //     movie.title.toLocaleLowerCase().indexOf(filterBy) !== 0);
  // }

  ngOnInit() {
    this.validatingForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    this.service.getAllMovies()
    .subscribe(data => {
      this.movies = data.map(e => {
        return {
          ...e.payload.doc.data()
        } as IMovie;
      })
    })

    // this.service.getAllMovies().subscribe({
    //   next: movies => {
    //     this.movies = movies
    //     this.movies = this.movies;
    //   },
    //   error: err => this.errorMessage = err
    // });

  }

  setMessage(c: AbstractControl): void {
    this.passMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  register() {
    console.log(this.validatingForm.value);

    if (this.validatingForm.valid) {
      this.service.submitRegister(this.validatingForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Successfuly',
          error => this.successMessage = 'Some errors'
        );
    }
  }

  moveToLogin() {
    this.router.navigate(['../login'], { relativeTo: this.a_route });
  }

  get username() {
    return this.validatingForm.get('username');
  }

  get email() {
    return this.validatingForm.get('email');
  }

  get password() {
    return this.validatingForm.get('password');
  }
}
