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
     { method: "GET", headers: { 'Authorization': 'p32178' } }
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
					'Authorization': 'p32178',
					'Accept': 'application/json',
     		 	'Content-Type': 'application/json'
				},
				body: JSON.stringify({...post})
			}
		);
      return result.json()
	},
	// ----------
  async removeOne(id){
    const result = await fetch(`${API_URL}/posts/${id}`,
       	{
			method: "DELETE", 
			headers: { 'Authorization': 'p32178' },
		}
	);
    return result.json();
	},
	// ----------
  async updatePost(id){
    const result = await fetch(`${API_URL}/posts/${id}`,
      {method: "PUT", headers: { 'Authorization': 'p32178' } }
    );
    return result.json();
	},
	async vote(post) {
		const result = await fetch(`${API_URL}/posts/${post.id}`, {
			method: "POST",
			headers:{
				'Authorization': 'p32178',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({option: post.option})
			
		});
		console.log('Server side response: ', result.status)
		return post
	},
	async edit({id, title, body, category}){
		const result = await fetch(`${API_URL}/posts/${id}`,{
			method: 'PUT',
			headers:{
				'Authorization': 'p32178',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({title, body, category})
		});
		console.log('Server side response: ', result.status)
		return result.json()
	}
};

export default postsAPI;
