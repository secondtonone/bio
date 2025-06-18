import clsx from 'clsx'
import React, { useId } from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: React.ReactNode
  placeholder?: string
  rows?: number
  value: string
  error?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Field: React.FC<Props> = ({
  label,
  placeholder,
  rows,
  value,
  onChange,
  error,
  ...props
}) => {
  const id = useId()

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2 relative">
        <label
          htmlFor={id}
          className="block text-lg font-medium text-black dark:text-white"
        >
          {label}
        </label>
        <textarea
          id={id}
          rows={rows}
          className={clsx(
            'block p-2.5 w-full text-lg text-black dark:text-white bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500',
            error && '!border-red-500 dark:!border-red-500',
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        ></textarea>

        <div
          className={clsx(
            'absolute text-xs right-1 bottom-1 text-black dark:text-white',
            error && '!text-red-500 dark:!text-red-500',
          )}
        >
          {value.length}
        </div>
      </div>
    </div>
  )
}

export default Field
