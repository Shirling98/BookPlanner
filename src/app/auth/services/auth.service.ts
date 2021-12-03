import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, signInWithPopup} from '@angular/fire/auth';
import {Router} from '@angular/router';

import 'firebase/auth';
import firebase from 'firebase/compat/app';
import {environment} from '../../../environments/environment';
import {IUser} from '../interfaces/interface';

//фиксит ошибку Firebase: No Firebase App '[DEFAULT]' has been created angular
firebase.initializeApp(environment.firebase);

@Injectable()
export class AuthService {

  errMess: string = '';

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  login(user: IUser) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
          this.router.navigate(['/books', 'list'])
        }
      )
      .catch((error) => {
        if(error.code == 'auth/user-not-found') {
         this.errMess = 'Некорректный email'
        } else if (error.code == 'auth/wrong-password'){
          this.errMess = 'Неверный пароль'
        }
      })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['auth']);
    })
  }

  isAuthenticated(): boolean {
    const auth = getAuth();
    const user = auth.currentUser;
    return !!user;
  }


  loginGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/books', 'list'])
      })
  }

  userInfo() {
    const auth = getAuth();
    if (auth.currentUser) {
      return auth?.currentUser?.email
    } else {
      return null
    }
  }
}
