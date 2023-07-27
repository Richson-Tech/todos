import ListHeader from "./components/ListHeader";
import {useEffect, useState} from 'react';
import ListItem from './components/ListItem'

const App = ()=> {
  const userEmail = 'crazy@gmail.com'
  const [tasks, setTasks] = useState(null)

  const getData = async ()=>{

      try {
        const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
        const json = await response.json()
        setTasks(json)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => getData, [])
  console.log(tasks);

// Sort by date
const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (

    <div className="app">
  <ListHeader listName={'🏝 Holiday tick list'}/>
  {sortedTasks?.map((task) =><ListItem key={task.id} task={task}/>)}
    </div>
  );
}

export default App;
 