import { APCAcontrast, fontLookupAPCA, sRGBtoY } from 'apca-w3';
import { colorParsley } from 'colorparsley';

type FontWeightColor = {
  fontWeight: number;
  color: string;
};

function findBestFontWeightColor(
  backgroundColor: string,
  colors: string[],
  availableFontWeights: number[] = [400, 700],
  fontSize: number = 16,
): FontWeightColor {
  let highestContrast = 0;
  let color: string | null = null;
  for (let i = 0; i < colors.length; i++) {
    const currentContrast = Math.abs(
      APCAcontrast(sRGBtoY(colorParsley(colors[i])), sRGBtoY(colorParsley(backgroundColor))),
    );
    if (currentContrast > highestContrast) {
      highestContrast = currentContrast;
      color = colors[i];
    }
  }

  const minFontSizesPerWeight: number[] = fontLookupAPCA(highestContrast).slice(1);
  let minFontWeight = Math.max(...availableFontWeights);
  for (let i = 0; i < minFontSizesPerWeight.length; i++) {
    if (minFontSizesPerWeight[i] > fontSize) {
      continue;
    }
    if (!availableFontWeights.includes(i * 100)) {
      continue;
    }
    minFontWeight = i * 100;
    break;
  }

  return {
    fontWeight: minFontWeight,
    color: color as string,
  };
}

export { findBestFontWeightColor, FontWeightColor };
