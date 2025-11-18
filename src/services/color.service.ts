import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'
import { ICategory } from '@/shared/types/category.interface'
import { IColor, IColorInput } from '@/shared/types/color.interface'

class ColorServices {
  async getAll() {
    const { data } = await axiosClassic<IColor[]>({
      url: API_URL.colors(),
      method: 'GET'
    })
    return data || []
  }
  async getByStoreId(storeId: string) {
    const { data } = await axiosWithAuth<IColor[]>({
      url: API_URL.colors(`/by-storeId/${storeId}`),
      method: 'GET'
    })
    return data || []
  }
  async getById(colorId: string) {
    const { data } = await axiosClassic<IColor>({
      url: API_URL.colors(`/by-id/${colorId}`),
      method: 'GET'
    })
    return data
  }
  async create(storeId: string, data: IColorInput) {
    const { data: createdColor } = await axiosWithAuth<ICategory>({
      url: API_URL.colors(`/${storeId}`),
      method: 'POST',
      data
    })
    return createdColor
  }
  async update(colorId: string, data: IColorInput) {
    const { data: updatedColor } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`/${colorId}`),
      method: 'PUT',
      data
    })
    return updatedColor
  }
  async delete(colorId: string) {
    const { data } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`/${colorId}`),
      method: 'DELETE'
    })
    return data
  }
}

export const colorServices = new ColorServices()
