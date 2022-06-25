const fetch = require('cross-fetch');

const codeForToken = async (code) => {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const { access_token } = await response.json();

  return access_token;
};

const getGithubProfile = async (token) => {};

module.exports = { codeForToken, getGithubProfile };
