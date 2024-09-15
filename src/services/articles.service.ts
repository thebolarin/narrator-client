import { ApiService } from './api.service'

export class ArticleService {
    private apiService

    constructor(){
        this.apiService = new ApiService()
    }

    async fetchList(researchQuestion: string ){
        
        const response = await this.apiService.get('/article/list', { researchQuestion })
        return response.data
    }

    async fetchAll(){
        const response = await this.apiService.get('/article')
        return response.data
    }

    async get(index:string){
        const response = await this.apiService.get(`/article/${index}`)
        return response.data
    }

    async create(payload: { researchQuestion: string }){
        const response = await this.apiService.post('/article', payload)
        return response.data
    }

    async generateNarrativeAnalysis(payload: { researchQuestion: string, articles: any, projectId: string }){
        const response = await this.apiService.post('/article/analyze', payload)
        return response.data
    }

    async delete(index:string){
        const response = await this.apiService.delete(`/article/${index}`)
        return response.data
    }
}