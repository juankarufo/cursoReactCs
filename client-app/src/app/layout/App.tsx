
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header,Button,List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { Activity } from '../models/activity';

function App() {
  const [activities, setActivities] = useState([]);

  
  useEffect( () => {
    axios.get('http://localhost:5000/api/activities')
    .then( response => {
      setActivities(response.data)
    })
  }, [])

  return (
    <>
      <h1>Reactiveness</h1>
      <Header as='h2' icon='users' content='Reactiveness'/>
      <List>
        {activities.map((activity: Activity) => (
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
