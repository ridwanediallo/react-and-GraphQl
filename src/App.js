// import './App.css';
import github from './db';
import { useEffect, useState, useCallback } from 'react';
import query from './Query';


function App() {
  const [userName, setUserName] = useState('')
  const [repoList, setRepoList] = useState(null)

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: JSON.stringify(query),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const viewer = data.data.viewer;
        setUserName(viewer.name);
        setRepoList(viewer.repositories.nodes)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>Repos
      </h1>
      <p>Hello from {userName}</p>

      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <li className="list-group-item" key={repo.id.toString()}>
              <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                {repo.name}
              </a>
              <p className="small">{repo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;








