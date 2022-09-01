import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { useSelectedAccount } from '../../../../../atoms/account';
import { TbSettings } from 'react-icons/all';
import HeaderGroup from '../../../components/HeaderGroup';
import { closeAllModals, openConfirmModal } from '@mantine/modals';

const AccountSettings: React.FC = () => {
  const account = useSelectedAccount();

  return (
    <>
      {account !== null && (
        <Paper p="md" sx={{ height: '100%' }}>
          <Stack justify="space-between" sx={{ height: '100%' }}>
            <HeaderGroup header="Account Settings" Icon={TbSettings} />
            <Stack>
              <Group grow>
                <Button
                  color="red"
                  variant="outline"
                  uppercase
                  disabled={account.type === 'group' || account.isDefault}
                >
                  Transfer Ownership
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  uppercase
                  disabled={account.type !== 'personal' || account.isDefault}
                  onClick={() => {
                    openConfirmModal({
                      title: 'Convert account to shared',
                      size: 'md',
                      children: <Text>Are you sure you want to convert this account to be shared?</Text>,
                      labels: { confirm: 'Confirm', cancel: 'Cancel' },
                      confirmProps: { color: 'red' },
                      onConfirm: () => closeAllModals(),
                      onCancel: () => closeAllModals(),
                    });
                  }}
                >
                  Convert to shared account
                </Button>
              </Group>
              <Button
                color="red"
                variant="outline"
                uppercase
                disabled={account.type === 'group' || account.isDefault}
                onClick={() =>
                  openConfirmModal({
                    title: 'Confirm deletion',
                    size: 'md',
                    children: <Text>Are you sure you want to delete this account?</Text>,
                    labels: { confirm: 'Delete', cancel: 'Cancel' },
                    confirmProps: { color: 'red' },
                    onConfirm: () => closeAllModals(),
                    onCancel: () => closeAllModals(),
                  })
                }
              >
                Delete Account
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default AccountSettings;
