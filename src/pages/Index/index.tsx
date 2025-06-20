import Field from '@/components/Field'
import Grid from '@/components/Grid'
import Toast from '@/components/Toast'
import { aminoAcidList } from '@/constants/aminoAcidColorMap'
import useClipboard from '@/hooks/useClipboard'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Link } from 'react-router'

const PATTERN = new RegExp(`^[${aminoAcidList.join('')}}\-]+$`)

const upper = 'VLSPADKTNIKASWEKIGSHGVLSPADKTNIKASWEKIGSHG'
const lower = 'ALSPADTTNIKASWEKIGSHGVDSPADKTNIKASWEKIGSHG'

interface Props {}

const Index: React.FC<Props> = () => {
  const [upperText, setUpperText] = useState(upper)
  const [lowerText, setLowerText] = useState(lower)
  const [showToast, setShowToast] = useState(false)

  const [submittedUpper, setSubmitUpper] = useState('')
  const [submittedLower, setSubmitLower] = useState('')

  useClipboard(
    () => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    },
    (text: string) => text.replace(/[\s\r\n]+/g, ''),
  )

  const handler =
    (set: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value.toUpperCase()
      if (PATTERN.test(value) || value === '') {
        set(value)
      }
    }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitUpper(upperText)
    setSubmitLower(lowerText)
  }

  const isChanged = submittedUpper !== upperText || submittedLower !== lowerText

  const error =
    upperText.length !== lowerText.length &&
    'Длина первой последовательности должна быть равна длине второй последовательности'

  return (
    <div className="max-w-[770px] m-auto mb-4">
      <form className="flex flex-col gap-1 p-4" onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <Field
            onChange={handler(setUpperText)}
            placeholder="VLSPADKTNI..."
            value={upperText}
            rows={2}
            label="Первая последовательность"
            error={lowerText.length > upperText.length}
          />

          <Field
            onChange={handler(setLowerText)}
            placeholder="VLSPADKTNI..."
            value={lowerText}
            rows={2}
            label="Вторая последовательность"
            error={lowerText.length < upperText.length}
          />
        </div>

        <button
          type="submit"
          disabled={
            upperText.length !== 0 && lowerText.length !== upperText.length
          }
          className={clsx(
            'py-2.5 px-5 me-2 mt-8 font-medium dark:text-black focus:outline-none dark:bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 block w-full md:w-[320px] cursor-pointer disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed text-lg',
            isChanged && '!text-black !bg-green-300 disabled:!bg-green-100',
          )}
        >
          {isChanged ? 'Обновить' : 'Показать'} последовательности
        </button>

        <p
          className={clsx(
            'mt-2 text-sm text-red-600 dark:text-red-500 opacity-0 min-h-[20px]',
            error && '!opacity-100',
          )}
        >
          {error}
        </p>
      </form>
      <div className="p-4">
        <Grid upper={submittedUpper} lower={submittedLower} />
      </div>
      <Link
        className="m-4 text-xs p-2 border border-black dark:border-white rounded-xl"
        to="/v2"
      >
        Вторая версия
      </Link>
      <Toast isVisible={showToast} />
    </div>
  )
}

export default Index
