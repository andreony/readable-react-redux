import { generateUUID } from "../shared";

const API_URL = 'http://127.0.0.1:3001';

export const formatComment = (body, author, parentId, id=null) => {
	return {
		id: id 
			? id 
			: generateUUID(),
		author,
		body,
		parentId,
		timestamp: Date.now(),
		voteScore: 0
	}
}
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
			headers:{
				'Authorization': '32451',
				'Accept': 'application/json',
     		'Content-Type': 'application/json'
			},
			body: JSON.stringify({option})
		});
		return {option, id}
	},
	async addOne({id, timestamp, body, author, parentId}){
		const result = await fetch(`${API_URL}/posts/comments`,{
			method: "POST",
			headers: {'Authorization': '234152'},
			body: `id=${id}&timestamp=${timestamp}&body=${body}&author=${author}&parentId=${parentId}`
		})
		return {id, timestamp, body, author, parentId}
	},
	async removeOne({id}){
		const result = await fetch(`${API_URL}/comments/${id}`,{
			method: "DELETE",
			headers: {'Authorization': '234152'}
		})
		return result
	},
	async edit({id, timestamp, body}){
		const result = await fetch(`${API_URL}/comments/${id}`,{
			method: "PUT",
			headers: {
				'Authorization': '234152',
				'Accept': 'application/json',
     		'Content-Type': 'application/json'
			},
			body: JSON.stringify({timestamp, body})
		})
		return result.json()
	}
}