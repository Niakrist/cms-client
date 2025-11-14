export interface IColor {
  id: string
  name: string
  value: string
  storeId: string
  createdAt: string
}

// Pick создает новый тип, с указанными свойствами из исходного типа.
// Берём  свойства 'name' | 'value' из IColor
export interface IColorInput extends Pick<IColor, 'name' | 'value'> {}
