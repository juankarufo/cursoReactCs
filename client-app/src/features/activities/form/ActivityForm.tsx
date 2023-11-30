import { Button, Label, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { ErrorMessage,  Form, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function ActivityForm () {
    
    const {activityStore} = useStore();
    const { loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect( () => {
        if (id) loadActivity(id).then( act => setActivity(act!));
    },[id, loadActivity])

    // function handleSubmit() {
    //     activity.id ? updateActivity(activity) : createActivity(activity);
    //     if(!activity.id){
    //         activity.id = uuid();
    //         createActivity(activity).then( () => { navigate(`/activities/${activity.id}`) });
    //     }else{
    //         createActivity(activity).then( () => { navigate(`/activities/${activity.id}`) });
    //     }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if(loadingInitial)  return <LoadingComponent content= 'Loading activity...'/>
    return (
        <Segment clearing>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => console.log(values)} 
            >
                {({values: activity, handleChange, handleSubmit}) => (

                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='title' palceholder="description"></MyTextInput>
                    <MyTextArea rows={3} palceholder='description' name='description' />
                    <MyTextInput palceholder='category' name='category' />
                    <MyTextInput palceholder='date' name='date' />
                    <MyTextInput palceholder='city' name='city' />
                    <MyTextInput palceholder='venue' name='venue' />
                    <Button loading={loading} floated='right' positive type='submit' content='Submit' name='title' />
                    <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel' name='title' />
                </Form>
                )}
            </Formik>
        </Segment>
    )
})

    