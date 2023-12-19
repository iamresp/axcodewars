export interface ICreateUser {
  avatar: string
  hash: string
  username: string
}

export interface IAuthUser {
  username: string
  hash: string
}

export interface IGetUser {
  avatar: string
  connId: string
  hash: string
  username: string
  uuid: string
}

export interface IEditUser {
  avatar?: string
  connId?: string
  hash?: string
  username?: string
  uuid?: string
}

export interface IGetConnectUser {
  avatar: string
  username: string
}
