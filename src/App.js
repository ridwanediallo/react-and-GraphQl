// import './App.css';
import github from './db';
import { useEffect, useState, useCallback } from 'react';
import query from './Query';
import RepoInfo from './RepoInfo';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('slides');
  const [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString));

    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
      })
      .catch((err) => console.log(err));
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>Repos
      </h1>
      <p>Hello from {userName}</p>
      <p>
        <b>Search for:</b> {queryString} | <b>Items per page:</b> {pageCount} |
        <b>Total results:</b> {totalCount} |
      </p>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

