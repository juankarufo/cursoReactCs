import { Button, Header, Label, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Activity, ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { ErrorMessage,  Form, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import {v4 as uuid} from 'uuid';
import { router } from "../../../app/router/Routes";

export default observer(function ActivityForm () {
    
    const {activityStore} = useStore();
    const { loadActivity, loadingInitial, updateActivity, createActivity} = activityStore;
    const {id} = useParams();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect( () => {
        if (id) loadActivity(id).then( activity => new ActivityFormValues(activity) );
    },[id, loadActivity])

    function handleSubmit(activity: ActivityFormValues) {
        if(!activity.id){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity as Activity).then( () => { router.navigate(`/activities/${newActivity.id}`) });
        }else{
            updateActivity(activity).then( () => { router.navigate(`/activities/${activity.id}`) });
        }
    }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if(loadingInitial)  return <LoadingComponent content= 'Loading activity...'/>
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color="teal" />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleSubmit(values)} 
            >
                {({values: activity, handleChange, handleSubmit, isValid, isSubmitting, dirty}) => (

                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='title' placeholder="description"></MyTextInput>
                    <MyTextArea rows={3} placeholder='description' name='description' />
                    <MySelectInput options={categoryOptions} palceholder='category' name='category' />
                    <MyDateInput 
                        placeholderText='date' 
                        name='date' 
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <Header content='Location Details' sub color="teal" />
                    <MyTextInput placeholder='city' name='city' />
                    <MyTextInput placeholder='venue' name='venue' />
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} 
                        floated='right' 
                        positive 
                        type='submit' 
                        content='Submit' 
                        name='title' />
                    <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel' name='title' />
                </Form>
                )}
            </Formik>
        </Segment>
    )
})