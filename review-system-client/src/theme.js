import { createMuiTheme } from "@material-ui/core/styles";

const fontSize = 14;
const htmlFontSize = 16;
const coef = fontSize / 14;

export const pxToRem = (size) => {
  return `${(size / htmlFontSize) * coef}rem`;
};

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f2f2f2",
    },
  },
});

export default theme