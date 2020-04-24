import { generateUUID } from "../shared";

const API_URL = "http://127.0.0.1:3001";

const postsAPI = {
	async fetchAll() {
    const result = await fetch(`${API_URL}/posts`,
     { method: "GET", headers: { 'Authorization': '31267' } }
    );
    return result.json();
	},
	// ----------
  async addOne({title, body, author, category}){
		const id = generateUUID()
		const result = await fetch(`${API_URL}/posts`, {
				method: "POST", 
				headers: { 'Authorization': 'p31267' },
				body:`id=${id}&timestamp=${Date.now()}&title=${title}&body=${body}&author=${author}&category=${category}`
			}
		);
      return result.json();
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
			headers:{'Authorization': '32451'},
			body: `option=${post.option}`
		});
		return post
	}  
};

export default postsAPI;
