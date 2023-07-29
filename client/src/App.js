
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [itemText,setItemText] = useState('');
  const [allListItems , setAllList] = useState([]);
  const [isUpdating , setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //Add New Item to the Database
  const newItem = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/add',{item : itemText});
      console.log(res);
      setAllList(prev => [...prev, res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  }

  //Fetch All List Items
  useEffect(()=>{
    const getItems = async ()=>{
      try {
        const res =await axios.get('http://localhost:8080/api/get');
        setAllList(res.data);
        console.log("fetch all");
      } catch (error) {
        console.log(error);
      }
    }
    getItems();
  },[])

  //Delete item onClick
  const del = async (id)=>{
    try {
      const res = await axios.delete(`http://localhost:8080/api/delete/${id}`);
      const newList = allListItems.filter(item => item._id !== id);
      setAllList(newList);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  //Update item
  const updateItem = async (e) =>{
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/update/${isUpdating}`, {item:updateItemText})
      const findUpdatedIndex = allListItems.findIndex(item => item._id === isUpdating);
      allListItems[findUpdatedIndex].item = updateItemText;
      setIsUpdating('')
      setUpdateItemText('')
      setItemText('')

    } catch (error) {
      console.log(error);
    }
  }
  const rederUpdateItem = () =>(
    <form onSubmit={(e)=> {updateItem(e)}} className='d-flex justify-content-between w-100'>
        <input type="text" class="form-control w-75" placeholder="New Text" onChange={e => setUpdateItemText(e.target.value)} value={updateItemText}/>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
  )

  return (
    <div className="App">
      <h1> To Do List </h1>
      <form onSubmit={e => newItem(e)} className='d-flex justify-content-between'>
        <div className="mb-3">
          <input type="text" className="form-control" name="listName" id="listName" aria-describedby="helpId" placeholder="item Name" onChange={e =>{setItemText(e.target.value)}} value={itemText}/>
        </div>
        <button type="submit" className="btn btn-primary w-10">Add Item</button>
      </form>
      <div className='toDo-ListItems'>
        {
          allListItems.map(item =>(
            <div className='list-Item d-flex justify-content-between'>
              {
                isUpdating === item._id
                ? rederUpdateItem() 
                :<>
                
                  <p className='h5 text-dark'>{item.item}</p>
                  <div>
                  <button type="button" className="btn btn-success" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button type="button" className="btn btn-danger" onClick={()=>{del(item._id)}}>Delete</button>
                  </div>
                
                </>
                
              }
            </div>
           
          ))
        }
      </div>
    </div>
  );
}

export default App;
