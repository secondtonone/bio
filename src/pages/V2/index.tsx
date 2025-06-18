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

  const error =
    upperText.length !== lowerText.length &&
    'Длина первой последовательности должна быть равна длине второй последовательности'

  return (
    <div className="max-w-[770px] m-auto mb-4">
      <form className="flex flex-col gap-1 p-4">
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
        <Grid upper={upperText} lower={lowerText} />
      </div>
      <Link
        className="m-4 text-xs p-2 border border-black dark:border-white rounded-xl"
        to="/"
      >
        Первая версия
      </Link>
      <Toast isVisible={showToast} />
    </div>
  )
}

export default Index
