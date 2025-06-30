import { ref, computed } from "vue";

export type ValidationRules =
    | 'required'
    | 'email'
    | { type: 'minLength'; value: number }
    | { type: 'maxLength'; value: number }
    | { type: 'pattern'; value: RegExp }

export type FieldConfig = {
    value: string
    rules: ValidationRules[]
}

export type FormConfig = {
    [fieldName: string]: FieldConfig
}

export function useFormValidation (config: FormConfig) {
    const formValues = ref<{ [key: string]: string }>({})
    const errors = ref<{ [key: string]: string[] }>({})
    const touched = ref<{ [key: string]: boolean }>({})
    const isSubmitted = ref(false)

    for (const field in config) {
        formValues.value[field] = config[field].value
        errors.value[field] = []
        touched.value[field] = false
    }

    function validateField(fieldName: string) {
        const value = formValues.value[fieldName]
        const rules = config[fieldName].rules
        const fieldErrors: string[] = []

        for (const rule of rules) {
            if (rule === 'required') {
                if (!value.trim()) {
                    fieldErrors.push(`Это поле ${fieldName} обязательное!`)
                }
            }

            else if (rule === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) {
                    fieldErrors.push(`Некорректный email!`)
                }
            }

            else if (rule.type === 'minLength') {
                if (value.length < rule.value) {
                    fieldErrors.push(`Минимальное количество символов ${rule.value}!`)
                }
            }

            else if (rule.type === 'maxLength') {
                if (value.length > rule.value) {
                    fieldErrors.push(`Максимальное количество символов ${rule.value}!`)
                }
            }

            else if (rule.type === 'pattern') {
                if (!rule.value.test(value)) {
                    fieldErrors.push(`Неверный формат!`)
                }
            }
        }

        errors.value[fieldName] = fieldErrors
    }

    function validateAllFields() {
        for (const field in config) {
            validateField(field)
            touched.value[field] = true
        }
    }

    function setValidateField(fieldName: string, value: string) {
        formValues.value[fieldName] = value
        validateField(fieldName)
    }

    function setFieldTouched(fieldName: string) {
        touched.value[fieldName] = true
    }

    const isValid = computed(() => {
        return Object.values(errors.value).every(errList => errList.length === 0)
    })

    return {
        formValues,
        errors,
        touched,
        isSubmitted,
        isValid,
        setValidateField,
        setFieldTouched,
        validateField,
        validateAllFields,
    }
}