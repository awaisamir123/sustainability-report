// Import template cover images
import templateCoverImage from './covers/generic-report-cover.png';

// Export individual covers for direct imports
export const genericCover = templateCoverImage;
export const griCover = templateCoverImage;
export const ghgCover = templateCoverImage;
export const sasbCover = templateCoverImage;
export const tcfdCover = templateCoverImage;
export const isoCover = templateCoverImage;

// Function to get cover image by framework type
export function getCoverByType(type: string): string {
  switch (type.toLowerCase()) {
    case 'generic': 
      return genericCover;
    case 'gri':
      return griCover;
    case 'ghg':
      return ghgCover;
    case 'sasb':
      return sasbCover;
    case 'tcfd':
      return tcfdCover;
    case 'iso':
      return isoCover;
    default:
      return genericCover;
  }
}