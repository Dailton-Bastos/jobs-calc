import { HStack, useRadioGroup } from '@chakra-ui/react';

import type { JobType } from '~/@types/job';
import { Radio } from '~/components/Form/Radio';

interface Props {
  value: JobType;
  onChange: (nextValue: JobType) => void;
}

export const Type = ({ value, onChange }: Props) => {
  const options = [
    {
      name: 'Interno',
      value: 'other',
    },
    {
      name: 'Orçamento',
      value: 'budget',
    },
    {
      name: 'Desenvolvimento',
      value: 'development',
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'type',
    onChange: onChange,
    value,
  });

  const group = getRootProps();

  return (
    <HStack {...group} mt="2" w="100%">
      {options?.map(({ name, value: optionValue }) => {
        const radio = getRadioProps({ value: optionValue });

        return (
          <Radio
            key={optionValue}
            {...radio}
            statusColor="orange"
            boxProps={{ w: '100%', textAlign: 'center' }}
          >
            {name}
          </Radio>
        );
      })}
    </HStack>
  );
};
