import { HStack, useRadioGroup } from '@chakra-ui/react';

import { JobStatus } from '~/@types/job';
import { Radio } from '~/components/Form/Radio';
import { jobSelectStatus } from '~/helpers/utils';

interface Props {
  defaultValue: JobStatus;
  onChange: (nextValue: JobStatus) => void;
}

export const Status = ({ defaultValue, onChange }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'status',
    defaultValue,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} mt="2">
      {jobSelectStatus?.map(({ name, value, color }) => {
        const radio = getRadioProps({ value });

        return (
          <Radio key={value} {...radio} statusColor={color}>
            {name}
          </Radio>
        );
      })}
    </HStack>
  );
};
