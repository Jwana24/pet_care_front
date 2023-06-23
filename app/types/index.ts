export interface IApiError {
  statusCode: number
  message: string
  error: string
}

export interface IPetFormEdit extends Omit<IPet, "id">{}
export interface IPetFormAdd extends Omit<IPet, "id"|"deceased"|"deceaseDate">{}

export interface IPet {
  id: number
  specie: string
  gender: string
  name: string
  breed: string
  coat: string
  birthCountry: string
  birthDate: Date | string
  deceased?: boolean
  deceaseDate?: Date | string
  picture?: string
  identificationType: string
  identificationDate: Date | string
  identificationPlace: string
  identificationNumber: string
  description?: string
}