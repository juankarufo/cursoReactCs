import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../detail/ActivityDetails';

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}/>
            </Grid.Column>      
            <Grid.Column width='6'>
                {activities[1] &&
                <ActivityDetails activity={activities[1]}/>}
            </Grid.Column>      

        </Grid>
    )
}