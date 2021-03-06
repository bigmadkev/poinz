import styled from 'styled-components';

import {COLOR_BACKGROUND_GREY, COLOR_LIGHTER_GREY, COLOR_ORANGE} from './colors';
import {RIGHT_MENU_WIDTH} from './dimensions';

export const StyledUserMenu = styled.div`
  z-index: 10;
  position: fixed;
  width: ${RIGHT_MENU_WIDTH}px;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.shown ? '0' : RIGHT_MENU_WIDTH * -1 + 'px')};
  transition: all 0.2s ease-out;
  background: ${COLOR_BACKGROUND_GREY};
  box-sizing: border-box;
  padding: 27px 8px 8px;

  &:after {
    content: '';
    border-right: 1px solid ${COLOR_LIGHTER_GREY};
    top: 44px;
    left: 0;
    position: absolute;
    bottom: 20px;
  }

  h5 {
    color: ${COLOR_ORANGE};
    font-weight: 700;
    margin-bottom: 8px;
    margin-top: 0;
  }
`;

export const StyledSection = styled.div`
  background: white;
  border: 1px solid ${COLOR_LIGHTER_GREY};
  padding: 8px;
  margin: 16px 0;
`;

export const StyledTextInput = styled.div`
  display: flex;
  align-items: stretch;
  padding: 4px;

  input {
    width: 80%;
    border: none;
    border-bottom: 1px solid ${COLOR_LIGHTER_GREY};
    padding: 1px 0;
    margin-right: 4px;
  }
`;

export const StyledRadioButton = styled.div`
  label {
    display: inline-block;
    margin-right: 8px;
    cursor: pointer;
  }

  input[type='radio'] {
    margin-right: 4px;
    display: inline-block;
  }
`;

export const StyledLicenseHint = styled.div`
  font-size: small;
  margin-bottom: 12px;
  position: absolute;
  bottom: 7px;
`;

export const StyledAvatarGrid = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledMiniAvatar = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-right: 4px;
  border-radius: 50%;
  border: ${({selected}) => (selected ? '2px solid ' + COLOR_ORANGE : '2px solid transparent')};
  padding: 2px;

  &:hover {
    box-shadow: inset 0 82px 15px -60px rgba(194, 194, 194, 0.65);
  }
`;
