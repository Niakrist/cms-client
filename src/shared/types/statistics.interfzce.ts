export interface IMainStatistics {
  id: number
  name: string
  value: number
}

export interface IMonthlySales {
  date: string
  value: number
}

// Последние 5 пользователей оплативших в нашем магазине
export interface ILastUsers {
  id: string
  name: string
  email: string
  picture: string
  total: number
}

export interface IMiddleStatistics {
  monthlySales: IMonthlySales[]
  lastUser: ILastUsers[]
}
