import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'
import {
  IStore,
  IStoreCreate,
  IStoreEdit
} from '@/shared/types/store.interface'

class StoreService {
  async getById(storeId: string) {
    const data = await axiosWithAuth<IStore>({
      url: API_URL.stores(storeId),
      method: 'GET'
    })
    return data
  }
  async create(data: IStoreCreate) {
    const { data: createdStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(''),
      method: 'POST',
      data
    })
    return createdStore
  }
  async update(data: IStoreEdit, storeId: string) {
    const { data: updatedStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${storeId}`),
      method: 'PUT',
      data
    })
    return updatedStore
  }
  async delete(storeId: string) {
    const { data: deletedStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${storeId}`),
      method: 'DELETE'
    })
    return deletedStore
  }
}

export const storeService = new StoreService()
