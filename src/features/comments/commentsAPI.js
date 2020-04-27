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
			headers:{'Authorization': 'p32178'}
		});
		return result.json()
	},
	// ---
	async vote({option, id}) {
		const result = await fetch(`${API_URL}/comments/${id}`, {
			method: "POST",
			headers:{
				'Authorization': 'p32178',
				'Accept': 'application/json',
     		'Content-Type': 'application/json'
			},
			body: JSON.stringify({option})
		});
		console.log('Server side response: ', result.status)
		return {option, id}
	},
	async addOne({id, timestamp, body, author, parentId}){
		const result = await fetch(`${API_URL}/comments`,{
			method: "POST",
			headers: {
				'Authorization': 'p32178',
				'Accept': 'application/json',
     		'Content-Type': 'application/json'
			},
			body: JSON.stringify({id, timestamp, body, author, parentId})
		})
		console.log('Server side response: ', result.status)
		return result.json()
	},
	async removeOne({id}){
		const result = await fetch(`${API_URL}/comments/${id}`,{
			method: "DELETE",
			headers: {'Authorization': 'p32178'}
		})
		console.log('Server side response: ', result.status)
		return result.json()
	},
	async edit({id, timestamp, body}){
		const result = await fetch(`${API_URL}/comments/${id}`,{
			method: "PUT",
			headers: {
				'Authorization': 'p32178',
				'Accept': 'application/json',
     		'Content-Type': 'application/json'
			},
			body: JSON.stringify({timestamp, body})
		})
		return result.json()
	}
}