import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

export class ApiService {
  private http: AxiosInstance

  constructor() {
    this.http = axios.create({ baseURL: 'http://localhost:8000/'})
  }

  async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    try {
      const response = await this.http.post<T>(url, data)
      return response
    } catch (error) {
      throw error
    }
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      const response = await this.http.delete<T>(url)
      return response
    } catch (error) {
      throw error
    }
  }

  async get<T>(url: string, queryParams?: any): Promise<AxiosResponse<T>> {
    try {
      const response = await this.http.get<T>(url, { params: queryParams })
      return response
    } catch (error) {
      throw error
    }
  }
}
