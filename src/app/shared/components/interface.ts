export interface IBook {
  name: string
  author: string
  genre: string
  description: string
  read: boolean
  id?: string
}

export interface FbCreateResponse {
  name: string
}

export interface IGenre {
  key: number
  val: string
}


export interface IUser {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface IAuthResponse {
  idToken: string,
  expiresIn: string
}
