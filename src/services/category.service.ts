import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'
import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

class CategoryService {
  // на backend этого метода нет
  async getAll() {
    const data = await axiosClassic<ICategory[]>({
      url: API_URL.categories(),
      method: 'GET'
    })
    return data
  }
  async getByStoreId(storeId: string) {
    const data = await axiosWithAuth<ICategory[]>({
      url: API_URL.categories(`/by-storeId/${storeId}`),
      method: 'GET'
    })
    return data
  }
  async getById(id: string) {
    const data = await axiosClassic<ICategory>({
      url: API_URL.categories(`/by-id/${id}`),
      method: 'GET'
    })
    return data
  }
  async create(data: ICategoryInput, storeId: string) {
    const { data: createdCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${storeId}`),
      method: 'POST',
      data
    })
    return createdCategory
  }
  async update(data: ICategoryInput, categoryId: string) {
    const { data: updatedCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${categoryId}`),
      method: 'PUT',
      data
    })
    return updatedCategory
  }
  async delete(categoryId: string) {
    const data = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${categoryId}`),
      method: 'DELETE'
    })
    return data
  }
}

export const categoryService = new CategoryService()
