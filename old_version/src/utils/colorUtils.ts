/**
 * Calculates the luminosity of a hexadecimal color
 * @param hexColor - Color in hexadecimal format (#RRGGBB)
 * @returns A value between 0 (black) and 1 (white)
 */
export const getLuminance = (hexColor: string): number => {
    const hex = hexColor.replace('#', '');

    // Converts hex values to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Calculates luminosity using the standard formula
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Determines if the text should be light or dark based on the background color
 * @param backgroundColor - Background color in hexadecimal format (#RRGGBB)
 * @param lightColor - Color for dark backgrounds (default: white)
 * @param darkColor - Color for light backgrounds (default: black)
 * @returns Appropriate text color based on contrast
 */
export const getContrastColor = (
    backgroundColor: string,
    lightColor: string = '#FFFFFF',
    darkColor: string = '#000000'
): string => {
    // Lightness threshold to determine whether text should be light or dark
    const luminanceThreshold = 0.5;
    const luminance = getLuminance(backgroundColor);
    return luminance < luminanceThreshold ? lightColor : darkColor;
};
