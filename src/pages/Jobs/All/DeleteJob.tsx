import React from 'react';

import type { UseModalProps } from '@chakra-ui/react';
import { ref, remove } from 'firebase/database';

import type { JobFormatted } from '~/@types/job';
import { ModalDelete } from '~/components/ModalDelete';
import { db } from '~/config/firebase';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

interface Props extends UseModalProps {
  job: JobFormatted;
}

export const DeleteJob = ({ job, isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { deleteJob } = useJobsContext();
  const { cyclesData, deleteCycle } = useCyclesContext();
  const { customToast } = useCustomToast();

  const id = job?.id;

  const handleDeleteJob = React.useCallback(async () => {
    const jobCycles = cyclesData?.filter((cycle) => cycle?.jobId === id);

    const jobsRef = ref(db, `jobs/${id}`);

    try {
      setIsLoading(true);

      const requestCycle = jobCycles?.map((cycle) => {
        const cycleRef = ref(db, `cycles/${cycle?.id}`);

        remove(cycleRef);

        if (cycle?.id) {
          deleteCycle(cycle?.id);
        }
      });

      const requestJob = remove(jobsRef);

      await Promise.all([requestCycle, requestJob]);

      setIsLoading(false);
      deleteJob(id);
      onClose();

      customToast({
        title: 'Job excluido',
        description: 'Job exluido com sucesso.',
        status: 'success',
      });
    } catch (error) {
      setIsLoading(true);
      customToast({
        title: 'Ocorreu um erro',
        description: 'Tente novamente, por favor.',
        status: 'error',
      });

      throw new Error('Erro to remove job');
    } finally {
      setIsLoading(false);
    }
  }, [id, cyclesData, onClose, deleteJob, deleteCycle, customToast]);

  return (
    <ModalDelete
      title="Certeza que deseja excluir?"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDeleteJob}
      isLoading={isLoading}
    />
  );
};
