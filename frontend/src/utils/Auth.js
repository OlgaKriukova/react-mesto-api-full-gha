//const baseUrl = 'http://mesto.ok.front.nomoredomains.work';
const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
  console.log('res.ok = '+res.ok)
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const signup = (email, password) => {
  console.log(`signup -  ${baseUrl}/signup`);

  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const signin = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const checkToken = (token) => {
  console.log('Auth checkToken begin - '+token);
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(checkResponse)
}
