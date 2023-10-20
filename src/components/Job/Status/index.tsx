import { HStack, useRadioGroup } from '@chakra-ui/react';

import { JobStatus } from '~/@types/job';
import { Radio } from '~/components/Form/Radio';
import { jobSelectStatus } from '~/helpers/utils';

interface Props {
  value: JobStatus;
  onChange: (nextValue: JobStatus) => void;
}

export const Status = ({ value, onChange }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'status',
    value,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} mt="2">
      {jobSelectStatus?.map(({ name, value: optionValue, color }) => {
        const radio = getRadioProps({ value: optionValue });

        return (
          <Radio key={optionValue} {...radio} statusColor={color}>
            {name}
          </Radio>
        );
      })}
    </HStack>
  );
};
