import axios, { Axios, AxiosError, AxiosResponse, Method } from "axios"
import { useCallback, useEffect, useRef, useState } from "react"

type setDataByObject<TForm> = (data: TForm) => void
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void
type FormSubmitOptions = {
    onSuccess: (response: AxiosResponse) => void
    onError: (error: AxiosError) => void
}
export interface IFormProps<TForm extends Record<string, unknown>> {
    data: TForm
    isDirty: boolean
    errors: Partial<Record<keyof TForm, string>>
    hasErrors: boolean
    processing: boolean
    wasSuccessful: boolean
    recentlySuccessful: boolean
    setData: setDataByObject<TForm> & setDataByMethod<TForm> & setDataByKeyValuePair<TForm>
    transform: (callback: (data: TForm) => TForm) => void
    setDefaults(): void
    setDefaults(field: keyof TForm, value: string): void
    setDefaults(fields: Record<keyof TForm, string>, value: string): void
    reset: (...fields: (keyof TForm)[]) => void
    clearErrors: (...fields: (keyof TForm)[]) => void
    setError(field: keyof TForm, value: string): void
    setError(errors: Record<keyof TForm, string>): void
    submit: (method: Method, url: string, options?: FormSubmitOptions) => void
    get: (url: string, options?: FormSubmitOptions) => void
    post: (url: string, options?: FormSubmitOptions) => void
    // patch: (url: string, options?: AxiosDataFetcherConfig) => void
    // put: (url: string, options?: AxiosDataFetcherConfig) => void
    delete: (url: string, options?: FormSubmitOptions) => void
    // cancel: () => void
}
export default function useForm<TForm extends Record<string, unknown>>(initialValues?: TForm): IFormProps<TForm> {
    const isMounted = useRef<boolean | null>(null)
    const [defaults, setDefaults] = useState(initialValues || {} as TForm)
    const cancelToken = useRef(null)
    const recentlySuccessfulTimeoutId = useRef(null)
    const [errors, setErrors] = useState({} as Partial<Record<keyof TForm, string>>)
    const [data, setData] = useState(defaults)
    const [hasErrors, setHasErrors] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [wasSuccessful, setWasSuccessful] = useState(false)
    const [recentlySuccessful, setRecentlySuccessful] = useState(false)

    let transform = (data: any) => data

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    type ResponseError = {
        data: {
            errors: any,
            message: string
        }
    }

    const submit = useCallback((method: Method, url: string, options?: FormSubmitOptions) => {
        setProcessing(true);
        axios({
            method,
            url: url,
            data: method === 'get' ? {} : data,
            params: method === 'get' ? data : {}
        }).then((response: AxiosResponse) => {
            console.log(response)
            setErrors({})
            setHasErrors(false);
            setProcessing(false);
            options?.onSuccess(response)
        }).catch((error: AxiosError<ResponseError>) => {
            // console.log('error');
            const errors = error.response?.data?.data?.errors || {};
            // console.log(error.response?.data.data.errors);
            setErrors(errors)
            setHasErrors(true);
            setProcessing(false);
            options?.onError(errors)
        })
    }, [data, setErrors])

    return {
        data,
        setData(keyOrData: keyof TForm | Function | TForm, maybeValue?: TForm[keyof TForm]) {
            if (typeof keyOrData === 'string') {
                setData({ ...data, [keyOrData]: maybeValue })
            }
        },
        isDirty: true,
        errors,
        hasErrors,
        processing,
        wasSuccessful,
        recentlySuccessful,
        transform(callback) {
            transform = callback
        },
        setDefaults(fieldOrFields?: keyof TForm | Record<keyof TForm, string>, maybeValue?: string) {
            // console.log(defaults)
            if (typeof fieldOrFields === 'undefined') {
                setDefaults(() => data)
            }
            else {
                console.log(typeof fieldOrFields)
                setDefaults((defaults) => ({
                    ...defaults,
                    ...(typeof fieldOrFields === 'string' ? { [fieldOrFields]: maybeValue } : (fieldOrFields as TForm))
                }))
            }
        },
        reset(...fields) {
            if (fields.length === 0)
                setData(defaults)
            else {
                setData(
                    (Object.keys(defaults) as Array<keyof TForm>).filter((key) => fields.includes(key)).reduce((carry, key) => {
                        carry[key] = defaults[key]
                        return carry
                    }, { ...data })
                )
            }
        },
        setError(fieldOrFields: keyof TForm | Record<keyof TForm, string>, maybeValue?: string) {
            setErrors((errors) => {
                const newErrors = {
                    ...errors,
                    ...(typeof fieldOrFields === 'string'
                        ? { [fieldOrFields]: maybeValue }
                        : (fieldOrFields as Record<keyof TForm, string>)),
                }
                setHasErrors(Object.keys(newErrors).length > 0)
                return newErrors
            })
        },
        clearErrors(...fields) {
            setErrors((errors) => {
                const newErrors = (Object.keys(errors) as Array<keyof TForm>).reduce((carry, field) => ({
                    ...carry,
                    ...(fields.length > 0 && !fields.includes(field) ? { [field]: errors[field] } : {})
                }), {})
                setHasErrors(Object.keys(newErrors).length > 0)
                return newErrors
            })
        },
        submit,
        get(url, options?) {
            submit('get', url, options)
        },
        post(url, options?) {
            submit('post', url, options)
        },
        delete(url, options?) {
            submit('delete', url, options)
        }
    }
}