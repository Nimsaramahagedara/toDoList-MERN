
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
      const res = await axios.post(`https://todolist-nimsara.onrender.com/api/add`,{item : itemText});
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
        const res =await axios.get(`https://todolist-nimsara.onrender.com/api/get`);
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
      const res = await axios.delete(`https://todolist-nimsara.onrender.com/api/delete/${id}`);
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
      await axios.put(`https://todolist-nimsara.onrender.com/api/update/${isUpdating}`, {item:updateItemText})
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
      <h4 className='p-3'> First MERN App - TO DO List </h4>
      <form onSubmit={e => newItem(e)} className='d-flex justify-content-between container-fluid'>
        <div className="mb-3 d-flex justify-content-between w-100 align-items-center">
          <input type="text" className="form-control w-75" name="listName" id="listName" aria-describedby="helpId" placeholder="item Name" onChange={e =>{setItemText(e.target.value)}} value={itemText}/>
          <button type="submit" className="btn btn-primary w-20">Add Item</button>
        </div>
        
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
      <p className='text-secondry mb-0'>Nimsara mahagedara</p>
      <a target="_blank" rel='noreferrer' href='https://github.com/Nimsaramahagedara'>Go to GitHub</a>
    </div>
  );
}

export default App;
