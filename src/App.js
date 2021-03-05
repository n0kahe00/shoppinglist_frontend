import {useState,useEffect} from 'react';
import './App.css';

const URL ="http://localhost/shoppinglist/";

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [item2, setItem2] = useState('');

  useEffect(() => {
    let status = 0;
    fetch(URL + 'index.php')
    .then(res => {
      status = parseInt(res.status);
      return res.json()
    })
    .then(
      (res) => {
        if (status === 200) {
          setItems(res);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }, [])

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL + 'add.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: item,
        amount: item2
      })
    })
    .then(res => {
      status = parseInt(res.status);
      console.log(status)
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setItems(items => [...items, res]);
          setItem('')
          setItem2('')
          
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }
  function remove(id) {
    let status = 0;
    fetch(URL + 'delete.php', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body:JSON.stringify({
        id: id
      })
    })
    .then(res => {
      status = parseInt(res.status);
      console.log(status)
      return res.json();
    })
    .then(
      (res) => {
        if (status ===  200) {
          const newListWithoutRemoved = items.filter((task) => task.id !== id);
          setItems(newListWithoutRemoved);
        } else  {
          alert(res.error);
        }
    }, (error) => {
      alert(error);
    }
   )
  }
  return (
    <div className="container">
      <h3>Shopping list</h3>
      <div class="pb-3">
        <form onSubmit={save}>
          <label class="fw-bold">New item</label>
          <input placeholder="Type description"value={item} onChange={e => setItem(e.target.value)}/>
          <input placeholder="Type amount" value={item2} onChange={e => setItem2(e.target.value)}/>
          <button class="btn-primary btn btn-sm mb-1">Add</button>
        </form>
      </div>
     
        {items.map(item => (
          <div class="row" key={item.id}>
            <p class="col-4">{item.description} </p>
            <p class="col-4">{item.amount}</p>
            <a class="col-4" onClick={() => remove(item.id)} href="#">Delete</a> 
          </div>
        ))}
    
   
    </div>
  
  );
}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
export default App;
