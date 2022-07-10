const pool = require('../utils/pool');

class Post {
  id;
  messages;

  constructor(row) {
    this.id = row.id;
    this.messages;
    row.messages;
  }

  static async getAllPosts() {
    const { rows } = await pool.query('SELECT messages FROM posts;');
    return rows.map((row) => new Post(row));
  }
}

module.exports = Post;
