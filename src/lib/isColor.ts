import { type AminoAcid, aminoAcidList } from '@/constants/aminoAcidColorMap'

export default function isColor(
  symbol: string | AminoAcid,
): symbol is AminoAcid {
  return aminoAcidList.includes(symbol as AminoAcid)
}
