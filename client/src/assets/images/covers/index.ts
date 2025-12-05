import genericCover from './customized/generic-cover.svg';
import griCover from './customized/gri-cover.svg';
import ghgCover from './customized/ghg-cover.svg';
import sasbCover from './customized/sasb-cover.svg';
import tcfdCover from './customized/tcfd-cover.svg';

export {
  genericCover,
  griCover,
  ghgCover,
  sasbCover,
  tcfdCover
};

export const getCoverByType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'gri':
      return griCover;
    case 'ghg':
      return ghgCover;
    case 'sasb':
      return sasbCover;
    case 'tcfd':
      return tcfdCover;
    default:
      return genericCover;
  }
};