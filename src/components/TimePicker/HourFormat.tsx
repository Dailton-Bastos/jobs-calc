import { Flex, Box } from '@chakra-ui/react';

type Props = {
  start: number;
  end: number;
  notShowExclude?: boolean;
  exclude?: number[];
  slecetorMove: number;
};

export const HourFormat = ({
  start,
  end,
  notShowExclude,
  exclude = [],
  slecetorMove,
}: Props) => {
  const timeArray: (string | number)[] = [];

  for (let time = start; time <= end; time++) {
    if (notShowExclude) !exclude?.includes(time) && timeArray.push(time);
    else timeArray.push(time);
  }

  return (
    <Flex
      direction="column"
      align="center"
      transition="transform 0.5s"
      lineHeight="10"
      pt="10"
      w="100%"
      style={{
        transform: `translateY(-${
          slecetorMove && timeArray.indexOf(slecetorMove) * 40
        }px)`,
      }}
    >
      {timeArray?.map((time) => {
        const isSelected = +time === slecetorMove;
        const isDisabled = exclude && exclude.includes(+time);

        return (
          <Box
            key={time}
            transition="color 0.5s"
            color={isSelected ? 'white' : 'black'}
            fontSize={isSelected ? 'xl' : 'md'}
            fontWeight={isSelected ? 'bold' : 'normal'}
            opacity={isDisabled ? '0.5' : '1'}
          >
            {time.toString().length === 1 ? `0${time}` : time}
          </Box>
        );
      })}
    </Flex>
  );
};
