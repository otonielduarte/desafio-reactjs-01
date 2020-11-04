import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const { status, data } = await api.get('repositories');
      if (status === 200) {
        setRepositories(data);
      }
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const title = `Desafio ReactJS${respositories.length > 0 ? respositories.length : ''}`
    const repository = {
      url: "https://github.com/josepholiveira",
      title: title,
      techs: ["React", "Node.js"],
    }
    const { status, data } = await api.post('repositories', repository);
    if (/* status === 201 */ data) {
      setRepositories([...respositories, data])
    }
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`);
    if (status === 204) {
      const newList = respositories.filter(repository => repository.id !== id);
      setRepositories(newList);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          respositories.map(repository => <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
        </button>
          </li>)
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
