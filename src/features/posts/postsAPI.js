const API_URL = "http://127.0.0.1:3001";

const postsAPI = {
  async fetchAll() {
    const result = await fetch(`${API_URL}/posts`,
     { method: "GET", headers: { 'Authorization': 'What-ever-you-want' } }
    );
    return result.json();
  }
};

export default postsAPI;
