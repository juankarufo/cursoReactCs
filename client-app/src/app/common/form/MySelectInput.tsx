import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
    palceholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function MySelectInput(props: Props){
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} >
            <label>{props.name}</label>
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(_,d ) => {
                    helpers.setValue(d.value)
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.palceholder}
            />
            { meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}