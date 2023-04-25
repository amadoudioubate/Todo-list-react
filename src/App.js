import { useState } from 'react';
import { v4 as uudiv4 } from 'uuid'
import './App.css';

function App() {
  const [items, setItems] = useState([])
  const [inputItemToAdd, setInputItemToAdd] = useState('')
  const [editId, setEditId] = useState(null)

  const handleSubmit = e => {
    e.preventDefault();
    const copyItems = [...items]
    const id = uudiv4();
    const name = inputItemToAdd;
    const itemToAdd = {id, name}
    if(editId) {
      const editIndex = copyItems.findIndex(item => item.id === editId)
      copyItems[editIndex].name = inputItemToAdd;
      setEditId(null)
    } else {
      copyItems.unshift(itemToAdd)
    }
    // Copie du state
    //const copyItems = [...items]
    // Manipulation de la copie du state
    setItems(copyItems)
    // Modification du state par le setter
    setInputItemToAdd('')
  }

  const handleDelete = id => {
    // Copie du state
    const copyItems = [...items]

    // Manipulation de la copie du state
    const updatedItems = copyItems.filter(item => item.id !== id)

    // Modification state par le setter
    setItems(updatedItems)

  }

  const handleEdit = id => {
    // Copie du state
    const copyItems = [...items]
    const itemFound = copyItems.find(item => item.id === id)
    setInputItemToAdd(itemFound.name)

    setEditId(id)
  }

  return (
    <div className="container bg-secondary h-100 p-3">
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input className='form-control d-inline'
            type='text' 
            placeholder='Ajouter un item...'
            value={inputItemToAdd}
            onChange={(e) => setInputItemToAdd(e.target.value)}
          />
          
          <button className='btn btn-primary'>
            {editId ? "Modifier" : "Ajouter"}
          </button>
        </div>
        
      </form>

      
        <ul className='list-group bg-primary mt-3'>
          {items.map(item => 
            <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
              <span>{item.name}</span>
              <div>
                <button 
                onClick={() => handleDelete(item.id)}
                className='btn btn-danger me-3'>Supprimer</button>
                <button 
                onClick={() => handleEdit(item.id)}
                className='btn btn-success'>Modifier</button>
              </div>
            </li>
          )}
        </ul>
      <p className='card mt-3 w-50 text-center m-auto'>{`Nombre de produits est : ${items.length}`}</p>
    </div>
  );
}

export default App;
