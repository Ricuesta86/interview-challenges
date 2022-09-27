import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  const handleChange=(e:any)=>{
    setText(e.target.value);
  }

  const handleDelete=(id:any)=>{
    setItems(items=>items.filter(item=>item.id !== id))
  }
  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input autoFocus name="text" type="text" onChange={(event)=>handleChange(event)} value={text} />
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text} <button onClick={()=>handleDelete(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
