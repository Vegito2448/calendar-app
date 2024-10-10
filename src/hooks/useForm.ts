import { ChangeEvent, useState } from 'react';

type Props<T> = {
  initialState: T;
  validate: (field: keyof T, value: T) => string | null;
};

type ErrorState<T> = {
  [K in keyof T as `${string & K}Error`]?: string;
};

export function useForm<T>({ initialState, validate }: Props<T>) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<ErrorState<T>>({});

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | {
    target: { name: keyof T; value: T[keyof T] | null; };
  }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validate(name as keyof T, formData);
    setErrors(prev => ({ ...prev, [`${String(name)}Error`]: error }));
  };

  const resetForm = (newFormState = initialState) => {
    setFormData(newFormState);
    setErrors({});
  };

  const isValidForm = () => {
    let valid = true;
    (Object.keys(formData as object) as (keyof T)[]).forEach(field => {
      const error = validate(field, formData);
      if (error) {
        setErrors(prev => ({ ...prev, [`${String(field)}Error`]: error }));
        valid = false;
      }
    });
    return valid;
  };

  return ({
    // Properties
    values: { ...formData },
    errors,

    // Methods
    handleChange,
    setFormData,
    resetForm,
    isValidForm,

  });
}