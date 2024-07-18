import { useField } from "formik";
import { IconType } from "react-icons";
import { FormField, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  className?: string;
  icon?: IconType;
  type?: string;
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  const IconComponent = props.icon;

  return (
    <FormField error={meta.touched && !!meta.error}>
      {props.label && <label>{props.label}</label>}
      <div className="input-container">
        {IconComponent && <IconComponent className="input-icon" />}
        <input {...field} {...props} className="user-input" />
      </div>
      {meta.touched && meta.error ? (
        <Label basic color="red">{meta.error}</Label>
      ) : null}
    </FormField>
  );

}
