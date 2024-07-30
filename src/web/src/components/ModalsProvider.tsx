import React, { createContext, useContext } from 'react';
import { useModalContainer, useSetModal } from '@/state/modals';
import { ModalProps } from '@/typings/modal';
import Modal from '@/components/Modal';

interface Props {
  children: React.ReactNode;
}

interface ModalsContextProps {
  open: (props: Omit<ModalProps, 'open'>) => void;
  close: () => void;
}

const ModalsContext = createContext<ModalsContextProps>(null as any);

const ModalsProvider: React.FC<Props> = ({ children }) => {
  const setModal = useSetModal();

  const open = React.useCallback(
    (props: Omit<ModalProps, 'open'>) => {
      setModal({
        open: true,
        ...props,
      });
    },
    [setModal]
  );

  const close = React.useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, [setModal]);

  const ctx: ModalsContextProps = {
    open,
    close,
  };

  return (
    <ModalsContext.Provider value={ctx}>
      <Modal />
      {children}
    </ModalsContext.Provider>
  );
};

export const useModal = () => useContext(ModalsContext);

export default ModalsProvider;
