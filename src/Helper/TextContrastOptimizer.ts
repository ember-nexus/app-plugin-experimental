import { APCAcontrast, sRGBtoY, fontLookupAPCA} from 'apca-w3';
import { colorParsley} from 'colorparsley';


type TextColorWeightPair = {
  textColor: string,
  textWeight: number
};

function findBestTextColorWeightPair(backgroundColor: string, textColors: string[], availableTextWeights: number[] = [400, 700], fontSize: number = 16): TextColorWeightPair {
  let highestContrast = 0;
  let textColor: string | null = null;
  for (let i = 0; i < textColors.length; i++) {
    const currentContrast = Math.abs(APCAcontrast(sRGBtoY(colorParsley(textColors[i])), sRGBtoY(colorParsley(backgroundColor))));
    if (currentContrast > highestContrast) {
      highestContrast = currentContrast;
      textColor = textColors[i];
    }
  }

  const minFontSizesPerWeight: number[] = fontLookupAPCA(highestContrast).slice(1);
  let minTextWeight = Math.max(...availableTextWeights);
  for (let i = 0; i < minFontSizesPerWeight.length; i++) {
    if (minFontSizesPerWeight[i] > fontSize) {
      continue;
    }
    if (!availableTextWeights.includes(i * 100)) {
      continue;
    }
    minTextWeight = i * 100;
    break;
  }

  return {
    textColor: textColor as string,
    textWeight: minTextWeight
  };
}

export {findBestTextColorWeightPair, TextColorWeightPair};

// let textColors = ['#000', '#fff'];
// let backgroundColor = '#f00';
//
// const pair = findBestTextColorWeightPair(backgroundColor, textColors);
// console.log(pair);
