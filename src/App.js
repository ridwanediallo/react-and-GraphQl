import './App.css';
import github from './db';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const githubQuery = {
      query: `
      {
        viewer {
          name
        }
      }
      `,
    };

    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
  }, []);

  return <div className="App"></div>;
}

export default App;

