const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post');
jest.mock('../lib/services/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('route should redirect to github oauth page at login', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_`
    );
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('allows a logged in user to view gitty posts', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });

    const resp = await agent.get('/api/v1/posts');
    const posts = await Post.getAllPosts();
    const expected = posts.map((post) => {
      return {
        id: post.id,
        messages: post.messages,
      };
    });
    expect(resp.body).toEqual(expected);
  });

  it('DELETE /sessions should sign out a user', async () => {
    const res = await request(app).delete('/api/v1/github/sessions');
    expect(res.body.message).toEqual('Signed out');
  });
});
