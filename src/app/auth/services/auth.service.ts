import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/interface";
import 'firebase/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth, signInWithEmailAndPassword, signInWithPopup} from "@angular/fire/auth";
import firebase from "firebase/compat/app";
import {Router} from "@angular/router";



@Injectable()
export class AuthService {

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
    return auth.currentUser.email
  }
}
