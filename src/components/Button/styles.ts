import styled from 'styled-components';

import { AppColors } from '../../styles/global';

type ContainerProps = {
  bgColor: string;
  color: string;
  borderColor: string;
  hoverBgColor: string;
  hoverColor: string;
};

export const variantColor = {
  primary: {
    bgColor: AppColors.primary,
    borderColor: AppColors.primary,
    color: AppColors.gray,
    hover: {
      bgColor: AppColors.darkPrimary,
      color: AppColors.gray,
    },
  },
  secondary: {
    bgColor: AppColors.secondary,
    borderColor: AppColors.secondary,
    color: AppColors.ligthGray,
    hover: {
      bgColor: AppColors.darkSecondary,
      color: AppColors.ligthGray,
    },
  },
  outline: {
    bgColor: 'transparent',
    borderColor: AppColors.gray,
    color: AppColors.gray,
    hover: {
      bgColor: AppColors.gray,
      color: AppColors.ligthGray,
    },
  },
};

export const Container = styled.button<ContainerProps>`
  width: 100%;
  max-width: 180px;
  height: 48px;

  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  color: ${({ color }) => color};

  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
    border: ${({ hoverBgColor }) => hoverBgColor};
    color: ${({ hoverColor }) => hoverColor};
  }
`;
