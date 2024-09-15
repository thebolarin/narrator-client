import { ApiService } from './api.service'

export class ProjectService {
    private apiService

    constructor(){
        this.apiService = new ApiService()
    }

    async fetchAll(){
        const response = await this.apiService.get('/projects')
        return response.data
    }

    async fetchAllResearch(projectId: string, page: number){
        const response = await this.apiService.get(`/research/project/${projectId}?page=${page}`)
        return response.data
    }

    async get(index:string){
        const response = await this.apiService.get(`/projects/${index}`)
        return response.data
    }

    async create(payload: { name: string, description: string }){
        const response = await this.apiService.post('/projects', payload)
        return response.data
    }

    async delete(index:string){
        const response = await this.apiService.delete(`/projects/${index}`)
        return response.data
    }
}