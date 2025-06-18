import { AminoAcid } from '@/constants/aminoAcidColorMap'

type Chunk = { value: AminoAcid | '' | '-' | ' '; colored: boolean }

export default function interleaveChunks(
  a: string,
  b: string,
  pageSize: number,
) {
  const result: Chunk[] = []

  if (!pageSize) return result

  const maxLength = Math.max(a.length, b.length)

  const aConverted = a.split('').map((item, index) => ({
    value: item,
    colored: item === '-' ? false : true,
  })) as Chunk[]
  const bConverted = b.split('').map((item, index) => ({
    value: item,
    colored: item === '-' ? false : a[index] !== item,
  })) as Chunk[]

  if (a.length !== b.length) {
    const diff = Math.abs(a.length - b.length)
    const smaller = a.length < b.length ? aConverted : bConverted
    for (let i = 0; i < diff; i++) {
      smaller.push({ value: ' ', colored: false })
    }
  }

  for (let i = 0; i < maxLength; i += pageSize) {
    const aChunk = aConverted.slice(i, i + pageSize)
    const bChunk = bConverted.slice(i, i + pageSize)

    aChunk.push({ value: '', colored: false })

    bChunk.push({ value: '', colored: false })
    bChunk.push({ value: '', colored: false })

    result.push(...aChunk, ...bChunk)
  }

  return result
}
