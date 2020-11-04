import React, { useEffect, useState} from "react";
import Repository from "./components/Repository";
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
    const repository = {
      url: "https://github.com/josepholiveira",
      title: 'Desafio ReactJS',
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
          respositories.map(repository => 
                <Repository 
                    key={repository.id} 
                    title={repository.title} 
                    onClick={() => handleRemoveRepository(repository.id)} />)
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
