import React from 'react';
import { useModalContainer, useModalState } from '@/state/modals';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Modal: React.FC = () => {
  const [modal, setModal] = useModalState();
  const container = useModalContainer();

  return (
    <Dialog open={modal.open} onOpenChange={() => setModal((prev) => ({ ...prev, open: false }))}>
      <DialogContent container={container} className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{modal.title}</DialogTitle>
          {modal.description && <DialogDescription>{modal.description}</DialogDescription>}
        </DialogHeader>
        {modal.children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
