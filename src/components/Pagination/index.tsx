import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import {
  Flex,
  Stack,
  Button,
  ListItem,
  UnorderedList,
  Icon,
} from '@chakra-ui/react';

import { DOTS, uuid } from '~/helpers/utils';
import { usePagination } from '~/hooks/usePagination';

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Props) => {
  const { paginationRange } = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNextPage = React.useCallback(() => {
    onPageChange(currentPage + 1);
  }, [onPageChange, currentPage]);

  const onPreviousPage = React.useCallback(() => {
    onPageChange(currentPage - 1);
  }, [onPageChange, currentPage]);

  const lastPage = React.useMemo(() => {
    return paginationRange[paginationRange.length - 1];
  }, [paginationRange]);

  const paginationRangeMemo = React.useMemo(() => {
    return paginationRange?.map((pageNumber) => {
      if (pageNumber === DOTS) {
        return (
          <ListItem listStyleType="none" key={uuid()}>
            &#8230;
          </ListItem>
        );
      }

      return (
        <ListItem listStyleType="none" key={uuid()}>
          <Button
            size="sm"
            background={pageNumber === currentPage ? 'gray.200' : 'transparent'}
            fontWeight={pageNumber === currentPage ? 'bold' : 'semibold'}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </Button>
        </ListItem>
      );
    });
  }, [paginationRange, onPageChange, currentPage]);

  if (currentPage === 0 || paginationRange?.length < 2) return <></>;

  return (
    <Flex align="center" justify="flex-end" mt={2}>
      <UnorderedList>
        <Stack spacing={2} direction="row" align="center">
          <ListItem listStyleType="none">
            <Button
              size="sm"
              background="transparent"
              onClick={onPreviousPage}
              disabled={currentPage === 1}
            >
              <Icon as={RiArrowLeftSLine} boxSize={5} />
            </Button>
          </ListItem>

          {paginationRangeMemo}

          <ListItem listStyleType="none">
            <Button
              size="sm"
              background="transparent"
              onClick={onNextPage}
              disabled={currentPage === lastPage}
            >
              <Icon as={RiArrowRightSLine} boxSize={5} />
            </Button>
          </ListItem>
        </Stack>
      </UnorderedList>
    </Flex>
  );
};
