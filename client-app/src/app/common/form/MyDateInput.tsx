// import { useField } from "formik";
// import { FormField, Label } from "semantic-ui-react";
// import DatePicker, {DatePickerProps} from "react-datepicker";

// export default function MyDateInput(props: Partial<DatePickerProps>) {
//     const [field, meta, helpers] = useField(props.name!);
    
//     return (
//         <FormField error={meta.touched && !!meta.error}>
//             <DatePicker 
//                 {...field}
                
//                 selected={(field.value && new Date(field.value)) || null}
//                 onChange={value => helpers.setValue(value)}
//             />
//             {meta.touched && meta.error ? (
//                 <Label basic color='red'>{meta.error}</Label>
//             ) : null}
//         </FormField>
//     )
// }