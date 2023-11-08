
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header,Button,List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { Activity } from '../models/activity';
import NavBar from './NavBar';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  
  useEffect( () => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then( response => {
      setActivities(response.data)
    })
  }, [])

  return (
    <>
      <h1>Reactiveness</h1>
      <NavBar />
      <List>
        {activities.map( activity => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
    </>
  )
}

export default App
