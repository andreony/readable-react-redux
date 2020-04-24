const API_URL = 'http://127.0.0.1:3001';

export const commentsAPI = {
    async fetchAll(postId) {
        const result = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: "GET",
            headers:{'Authorization': '312267'}
        });
        return result.json()
    },
    // ---
    async vote({option, id}) {
        const result = await fetch(`${API_URL}/comments/${id}`, {
            method: "POST",
            headers:{'Authorization': '32451'},
            body: `option=${option}`
        });
        return {option, id}
    },
    async addOne({id, timestamp, body, author, parentId}){
        const result = await fetch(`${API_URL}/posts/comments`,{
            method: "POST",
            headers: {'Authorization': '234152'},
            body: `id=${id}&timestamp=${timestamp}&body=${body}&author=${author}&parentId=${parentId}`
        })
        return result.json()
    },
    async removeOne({id}){
        const result = await fetch(`${API_URL}/comments/${id}`,{
            method: "DELETE",
            headers: {'Authorization': '234152'}
        })
        return result
    }
}