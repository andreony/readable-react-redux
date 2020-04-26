import { generateUUID } from "../shared";

const formatPost = (title, body, author, category) => {
	return {
		id: generateUUID(),
		title, 
		body, 
		author,
		category,
		timestamp: Date.now(),
		commentCount: 0,
		voteScore: 0
	}
}

const API_URL = "http://127.0.0.1:3001";

const postsAPI = {
	async fetchAll() {
    const result = await fetch(`${API_URL}/posts`,
     { method: "GET", headers: { 'Authorization': '31267' } }
    );
    return result.json();
	},
	// ----------
  async addOne(newPost){
		const {title, body, author, category} = newPost
		const post = formatPost(title, body, author, category)
		const result = await fetch(`${API_URL}/posts`, {
				method: "POST", 
				headers: { 
					'Authorization': 'p31267',
					'Accept': 'application/json',
     		 	'Content-Type': 'application/json'
				},
				body: JSON.stringify({...post})
			}
		);
      return post
	},
	// ----------
  async removeOne(id){
    const result = await fetch(`${API_URL}/posts/${id}`,
       	{
			method: "DELETE", 
			headers: { 'Authorization': 'p31267' },
		}
	);
    return result.json();
	},
	// ----------
  async updatePost(id){
    const result = await fetch(`${API_URL}/posts/${id}`,
      {method: "PUT", headers: { 'Authorization': 'put31267' } }
    );
    return result.json();
	},
	async vote(post) {
		const result = await fetch(`/posts/${post.id}`, {
			method: "POST",
			headers:{
				'Authorization': '32451',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({option: post.option})
			
		});
		return {...post}
	},
	async edit({id, title, body, category}){
		const result = await fetch(`${API_URL}/posts/${id}`,{
			method: 'PUT',
			headers:{
				'Authorization': '32451',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({title, body, category})
		});
		return result.json()
	}
};

export default postsAPI;
