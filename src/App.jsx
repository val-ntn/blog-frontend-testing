//App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts') // adjust to match your backend
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="App">
      <h1>My App</h1>
      <p>Data from backend:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App