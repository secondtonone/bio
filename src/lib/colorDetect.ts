import { aminoAcidColorMap } from '@/constants/aminoAcidColorMap'
import isColor from './isColor'

const colorDetect = (amino: string) =>
  isColor(amino) ? aminoAcidColorMap[amino] : 'inherit'

export default colorDetect
