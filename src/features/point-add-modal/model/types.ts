

export type FieldConfig = {
    name: string
    label: string
    type: 'text' | 'textarea' | 'number' | 'select'
    required?: boolean
    options?: Array<{ label: string; value: string }>
    placeholder?: string
}