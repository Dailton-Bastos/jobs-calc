import { Story, ComponentMeta } from '@storybook/react';

import { Button, ButtonProps } from '.';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        values: ['primary', 'secondary', 'outline'],
      },
    },
  },
} as ComponentMeta<typeof Button>;

export const Primary: Story<ButtonProps> = (args) => {
  return <Button {...args}>Primary Button</Button>;
};

export const Secondary: Story<ButtonProps> = (args) => {
  return <Button {...args}>Secondary Button</Button>;
};

Secondary.args = {
  variant: 'secondary',
};

export const Outline: Story<ButtonProps> = (args) => {
  return <Button {...args}>Outline Button</Button>;
};

Outline.args = {
  variant: 'outline',
};
