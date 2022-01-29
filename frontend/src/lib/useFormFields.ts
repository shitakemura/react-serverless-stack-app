import { useState } from "react";

type FormFieldsProps = {
  [id: string]: string;
};

export const useFormFields = (initialState: FormFieldsProps) => {
  const [fields, setValues] = useState(initialState);
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  };

  return { fields, handleFieldChange };
};
