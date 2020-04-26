const API_URL = 'http://127.0.0.1:3001';

export const categoriesAPI = {
    async fetchAll(){
        const result = await fetch(`${API_URL}/categories`, {
            method: 'GET',
            headers: {'Authorization': 32154}
        })
        return result.json()
    }
}