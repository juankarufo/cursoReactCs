import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

interface Props {
    activities: Activity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({activities, deleteActivity,submitting}: Props) {

    const [target, setTarget] = useState('');

    function handleAActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id) 
    }

    const {activityStore} = useStore();
    return (
        <Segment>
            <Item.Group>
                {activities.map( activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    name={activity.id}
                                    loading={submitting && target == activity.id} 
                                    floated='right' 
                                    content='Delete' 
                                    color = 'red' 
                                    onClick={ (e) => handleAActivityDelete(e,activity.id)}
                                />
                                <Button 
                                    floated='right' 
                                    content='View' 
                                    color = 'blue' 
                                    onClick={ () => 
                                    activityStore.selectActivity(activity.id) }
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}