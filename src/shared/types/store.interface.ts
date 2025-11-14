export interface IStore {
  id: string
  title: string
  description: string
}

// Pick создает новый тип, с указанными свойствами из исходного типа.
// Берёт только свойство 'title' из IStore
export interface IStoreCreate extends Pick<IStore, 'title'> {}

// Omit создает новый тип, исключая указанные свойства из исходного типа.
// Берёт все свойства, кроме 'id' из IStore
export interface IStoreEdit extends Omit<IStore, 'id'> {}

