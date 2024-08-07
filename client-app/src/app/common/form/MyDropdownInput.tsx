import React from 'react';
import { useField } from 'formik';
import { Dropdown, DropdownProps, FormField, Label } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  className?: string;
  options: DropdownProps['options'];
}

const MyDropdownInput: React.FC<Props> = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      {label && <label>{label}</label>}
      <Dropdown
        fluid
        selection
        options={options}
        placeholder={props.placeholder}
        onChange={(e, { value }) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        className={props.className}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default MyDropdownInput;