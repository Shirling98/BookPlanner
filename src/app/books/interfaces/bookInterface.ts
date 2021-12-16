export interface IBook {
  name: string
  author: string
  genre: string
  description: string
  read: boolean
  cover?: string
  id?: string
}

export interface FbCreateResponse {
  name: string
}

export interface IGenre {
  key: number
  val: string
}

export interface IGenres {
  val: IGenre
  key: string
}

export interface ISearch {
  searchStr: string
}
