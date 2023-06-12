export interface IApiError {
  statusCode: number
  message: string
  error: string
}

export interface IPet {
  id: number
  specie: string
  gender: string
  name: string
  breed: string
  coat: string
  birthCountry: string
  birthDate: Date
  deceased: true
  deceaseDate: Date
  picture: string
  identificationType: string
  identificationDate: Date
  identificationPlace: string
  identificationNumber: string
  description: string
}