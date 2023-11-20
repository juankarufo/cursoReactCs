import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer(function ActivityForm () {
    
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    })

    useEffect( () => {
        if (id) loadActivity(id).then( act => setActivity(act!));
    },[id, loadActivity])

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then( () => { navigate(`/activities/${activity.id}`) });
        }else{
            createActivity(activity).then( () => { navigate(`/activities/${activity.id}`) });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(loadingInitial)  return <LoadingComponent content= 'Loading activity...'/>
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' name='title' onChange={handleInputChange}/>
                <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel' name='title' onChange={handleInputChange}/>
            </Form>
        </Segment>
    )
})

    