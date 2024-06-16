import React from 'react';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { ref, push, ThenableReference, update } from 'firebase/database';

import { JobApiData } from '~/@types/job';
import { db } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobs } from '~/hooks/useJobs';
import { useJobsContext } from '~/hooks/useJobsContext';
import {
  finishCurrentCycleAction,
  startNewCycleAction,
} from '~/reducers/cycles/actions';
import { updateJobActions } from '~/reducers/jobs/actions';

import { Modal } from './Modal';

type Props = {
  jobApiData: JobApiData;
  isActiveJob: boolean;
};

export const Control = ({ jobApiData, isActiveJob }: Props) => {
  const [isLoading, seIsLoading] = React.useState(false);
  const [markJobAsDone, setMarkJobAsDone] = React.useState(false);
  const [cycleDescription, setCycleDescription] = React.useState('');

  const { cycleDispatch, activeCycle, activeJob } = useCyclesContext();
  const { jobDispatch } = useJobsContext();
  const { updateJob } = useJobs();
  const { customToast } = useCustomToast();
  const { user, jobber } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const disableControlButtons =
    jobApiData.status === 'done' ||
    (!!activeJob && activeJob.id !== jobApiData.id);

  const handleStartNewCycle = React.useCallback(() => {
    if (!user) return;

    const dateInTimestamp = new Date().getTime();

    const cycle = {
      userId: user.uid,
      jobId: jobApiData.id,
      startDate: dateInTimestamp,
      isActive: true,
      description: '',
    };

    const { key }: ThenableReference = push(ref(db, 'cycles'), cycle);

    if (!key) return;

    cycleDispatch(
      startNewCycleAction({
        id: key,
        ...cycle,
      }),
    );
  }, [jobApiData, cycleDispatch, user]);

  const saveJobberNote = React.useCallback(
    async (start: Date, finish: Date, description: string) => {
      if (!jobber || !jobber.accessToken) return;

      const baseUrl = import.meta.env.VITE_APP_JOBBER_API;

      const job = activeJob?.jobberId || jobber.internalId;

      if (!job) return;

      try {
        await fetch(`${baseUrl}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jobber.accessToken}`,
          },
          body: JSON.stringify({
            description,
            job,
            start,
            finish,
          }),
        });
      } catch {
        customToast({
          status: 'error',
          title: 'Ocorreu um erro!',
          description: 'Error ao salvar apontamento no jobber',
        });
      }
    },
    [jobber, activeJob, customToast],
  );

  const handleFinishCurrentCycle = React.useCallback(async () => {
    if (!activeCycle) return;

    const dateInTimestamp = new Date().getTime();

    try {
      seIsLoading(true);

      const cycle = {
        ...activeCycle,
        description: cycleDescription,
        isActive: false,
        fineshedDate: dateInTimestamp,
      };

      await update(ref(db, `cycles/${activeCycle?.id}`), { ...cycle });

      if (markJobAsDone) {
        await updateJob({
          ...jobApiData,
          status: 'done',
          isHighlight: false,
        });

        jobDispatch(
          updateJobActions({
            ...jobApiData,
            status: 'done',
            updatedAt: dateInTimestamp,
          }),
        );
      }

      cycleDispatch(finishCurrentCycleAction({ ...cycle }));

      seIsLoading(false);

      setCycleDescription('');

      await saveJobberNote(
        new Date(cycle.startDate),
        new Date(cycle.fineshedDate),
        cycleDescription,
      );

      onClose();
    } catch (error) {
      seIsLoading(false);

      customToast({
        status: 'error',
        title: 'Ocorreu um erro!',
        description: 'Error ao salvar',
      });
    }
  }, [
    cycleDispatch,
    cycleDescription,
    onClose,
    updateJob,
    jobApiData,
    jobDispatch,
    markJobAsDone,
    activeCycle,
    customToast,
    saveJobberNote,
  ]);

  const changeCycleDescription = React.useCallback((value: string) => {
    setCycleDescription(value);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setCycleDescription('');

    onClose();
  }, [onClose]);

  React.useEffect(() => {
    setMarkJobAsDone(jobApiData.type === 'other' && !jobApiData.isHighlight);
  }, [jobApiData]);

  return (
    <Flex align="center" justify="center">
      <Box mt="6">
        {activeCycle && isActiveJob ? (
          <IconButton
            aria-label="Parar"
            title="Finalizar"
            variant="outline"
            colorScheme="gray"
            size="lg"
            icon={<RiPauseMiniFill size={28} />}
            onClick={onOpen}
            disabled={disableControlButtons}
          />
        ) : (
          <IconButton
            aria-label="Iniciar"
            variant="outline"
            colorScheme="gray"
            size="lg"
            icon={<RiPlayMiniLine size={28} />}
            onClick={handleStartNewCycle}
            disabled={disableControlButtons}
          />
        )}
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        handleFinishCurrentCycle={handleFinishCurrentCycle}
        isChecked={markJobAsDone}
        onChangeChecked={() => setMarkJobAsDone((prev) => !prev)}
        cycleDescription={cycleDescription}
        changeCycleDescription={changeCycleDescription}
        isLoading={isLoading}
      />
    </Flex>
  );
};
