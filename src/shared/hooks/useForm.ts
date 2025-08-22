import { useCallback, useMemo, useState } from 'react';

export type Errors<T> = Partial<Record<keyof T, string>>;
export type Validator<T> = (values: T) => Errors<T>;

export function useForm<T extends Record<string, any>>(opts: {
  initial: T;
  validate?: Validator<T>;
  onSubmit: (values: T) => void | Promise<void>;
}) {
  const { initial, validate, onSubmit } = opts;
  const [values, setValues] = useState<T>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitCount, setSubmitCount] = useState(0);

  const errors: Errors<T> = useMemo(() => (validate ? validate(values) : {}), [values, validate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type, checked } = e.target;
      setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    },
    []
  );

  const handleBlur = useCallback((e: React.FocusEvent<any>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initial);
    setTouched({});
    setSubmitCount(0);
  }, [initial]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitCount((c) => c + 1);
      if (Object.values(errors).filter(Boolean).length === 0) {
        await onSubmit(values);
        resetForm();
      }
    },
    [errors, onSubmit, resetForm, values]
  );

  return { values, setValues, errors, touched, submitCount, handleChange, handleBlur, handleSubmit, resetForm };
}
