import * as _         from 'lodash';
import * as t         from 'tcomb-form-native';
import { StyleSheet } from 'react-native';

export const PRIMARY      = '#7BABED';
export const SECONDARY    = '#CED6E3';
export const INFO         = '#D1E2F9';
export const SUCCESS      = '#8BE28B';
export const WARNING      = '#FDE8A9';
export const WARNING_DARK = '#EFB949';
export const DANGER       = '#F5C3D8';
export const DANGER_DARK  = '#EE7D92';

export const GRAY       = '#BBBBBB';
export const DARK_GRAY  = '#747C85';
export const LIGHT_GRAY = '#B0B8BF';
export const NO_COLOR   = 'rgba(0, 0, 0, 0)';

const btnText = {
  fontSize: 20,
  fontFamily: 'rubik-medium'
};

const btnOutline = {
  backgroundColor: NO_COLOR,
  borderWidth: 2
};

// global stylesheet
export default StyleSheet.create({

  // colors
  primary: {
    color: PRIMARY
  },
  secondary: {
    color: SECONDARY
  },
  info: {
    color: INFO
  },
  success: {
    color: SUCCESS
  },
  warning: {
    color: WARNING
  },
  danger: {
    color: DANGER
  },

  // background colors
  primaryBG: {
    backgroundColor: PRIMARY
  },
  secondaryBG: {
    backgroundColor: SECONDARY
  },
  infoBG: {
    backgroundColor: INFO
  },
  successBG: {
    backgroundColor: SUCCESS
  },
  warningBG: {
    backgroundColor: WARNING
  },
  dangerBG: {
    backgroundColor: DANGER
  },

  // button regular styles
  btn: {
    borderRadius: 50
  },
  btnPrimary: {
    backgroundColor: PRIMARY
  },
  btnSecondary: {
    backgroundColor: SECONDARY
  },
  btnInfo: {
    backgroundColor: INFO
  },
  btnSuccess: {
    backgroundColor: SUCCESS
  },
  btnWarning: {
    backgroundColor: WARNING
  },
  btnDanger: {
    backgroundColor: DANGER
  },

  // button outline styles
  btnPrimaryOutline: {
    ...btnOutline,
    borderColor: PRIMARY
  },
  btnSecondaryOutline: {
    ...btnOutline,
    borderColor: SECONDARY
  },
  btnInfoOutline: {
    ...btnOutline,
    borderColor: INFO
  },
  btnSuccessOutline: {
    ...btnOutline,
    borderColor: SUCCESS
  },
  btnWarningOutline: {
    ...btnOutline,
    borderColor: WARNING
  },
  btnDangerOutline: {
    ...btnOutline,
    borderColor: DANGER
  },

  // button text styles
  btnText: {
    ...btnText,
    color: '#fff'
  },
  btnWarningText: {
    ...btnText,
    color: WARNING_DARK
  },
  btnDangerText: {
    ...btnText,
    color: DANGER_DARK
  },

  // card styles
  card: {
    borderRadius: 12
  }

});

// default from with flat inputs
export const flatInputStyleSheet = _.cloneDeep(t.form.Form.stylesheet);
const {
  controlLabel,
  formGroup,
  helpBlock,
  textbox,
  textboxView,
  errorBlock
} = flatInputStyleSheet;

formGroup.normal.marginBottom = 20;

controlLabel.normal.fontFamily = 'rubik-medium';
controlLabel.error.fontFamily  = 'rubik-medium';
controlLabel.normal.color      =  LIGHT_GRAY;
controlLabel.error.color       =  LIGHT_GRAY;

errorBlock.fontFamily = 'rubik-regular';
errorBlock.color      =  DANGER_DARK;

helpBlock.normal.fontFamily = 'rubik-regular';
helpBlock.error.fontFamily  = 'rubik-regular';
helpBlock.normal.color      =  LIGHT_GRAY;
helpBlock.error.color       =  LIGHT_GRAY;

textbox.normal.fontFamily   = 'rubik-medium';
textbox.error.fontFamily    = 'rubik-medium';
textbox.normal.color        =  DARK_GRAY;
textbox.error.color         =  DARK_GRAY;
textbox.normal.borderWidth  =  0;
textbox.error.borderWidth   =  0;
textbox.normal.marginBottom =  0;
textbox.error.marginBottom  =  0;

textboxView.normal.borderColor       = GRAY;
textboxView.error.borderColor        = DANGER;
textboxView.normal.borderWidth       = 0;
textboxView.error.borderWidth        = 0;
textboxView.normal.borderRadius      = 0;
textboxView.error.borderRadius       = 0;
textboxView.normal.borderBottomWidth = 1;
textboxView.error.borderBottomWidth  = 1;