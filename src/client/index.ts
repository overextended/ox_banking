import type { Character } from '../common/typings';
import targets from '../../data/targets.json';
import locations from '../../data/locations.json';
import atms from '../../data/atms.json';
import { SendTypedNUIMessage, serverNuiCallback } from 'utils';
import { getLocales } from '@overextended/ox_lib/shared';
import { OxAccountPermissions, OxAccountRoles } from '@overextended/ox_core';

const usingTarget = GetConvarInt('ox_banking:target', 0) === 1;
let hasLoadedUi = false;
let isUiOpen = false;

function initUI() {
  if (hasLoadedUi) return;

  const accountRoles: OxAccountRoles[] = GlobalState.accountRoles;

  // @ts-expect-error
  const permissions: Record<OxAccountRoles, OxAccountPermissions> = {};

  accountRoles.forEach((role) => {
    permissions[role] = GlobalState[`accountRole.${role}`] as OxAccountPermissions;
  });

  SendNUIMessage({
    action: 'setInitData',
    data: {
      locales: getLocales(),
      permissions,
    },
  });

  hasLoadedUi = true;
}

const openATM = () => {
  initUI();

  isUiOpen = true;

  SendTypedNUIMessage('openATM', null);
  SetNuiFocus(true, true);
};

exports('openATM', openATM);

const openBank = () => {
  initUI();

  const playerCash: number = exports.ox_inventory.GetItemCount('money');
  isUiOpen = true;

  SendTypedNUIMessage<Character>('openBank', { cash: playerCash });
  SetNuiFocus(true, true);
};

exports('openBank', openBank);

const createBankBlip = (coords: number[]) => {
  const blip = AddBlipForCoord(coords[0], coords[1], coords[2]);
  SetBlipSprite(blip, 207);
  SetBlipColour(blip, 2);
  SetBlipAsShortRange(blip, true);
  BeginTextCommandSetBlipName('STRING');
  AddTextComponentString('Bank');
  EndTextCommandSetBlipName(blip);
};

if (!usingTarget) {
  for (let i = 0; i < locations.length; i++) createBankBlip(locations[i]);
}

if (usingTarget) {
  exports.ox_target.addModel(
    atms.map((value) => GetHashKey(value)),
    {
      name: 'access_atm',
      icon: 'fa-solid fa-money-check',
      label: 'Access ATM',
      onSelect: () => {
        openATM();
      },
    }
  );

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];

    exports.ox_target.addBoxZone({
      coords: target.coords,
      size: target.size,
      rotation: target.rotation,
      debug: true,
      interactionDistance: 1.3,
      drawSprite: true,
      options: [
        {
          name: 'access_bank',
          icon: 'fa-solid fa-dollar-sign',
          label: 'Access bank',
          onSelect: () => {
            openBank();
          },
        },
      ],
    });

    createBankBlip(target.coords);
  }
}

RegisterNuiCallback('exit', () => {
  isUiOpen = false;

  SetNuiFocus(false, false);
});

on('ox_inventory:itemCount', (itemName: string, count: number) => {
  if (!isUiOpen || itemName !== 'money') return;

  SendTypedNUIMessage<Character>('openBank', { cash: count });
});

serverNuiCallback('getDashboardData');
serverNuiCallback('transferOwnership');
serverNuiCallback('manageUser');
serverNuiCallback('removeUser');
serverNuiCallback('getAccountUsers');
serverNuiCallback('addUserToAccount');
serverNuiCallback('getAccounts');
serverNuiCallback('createAccount');
serverNuiCallback('deleteAccount');
serverNuiCallback('depositMoney');
serverNuiCallback('withdrawMoney');
serverNuiCallback('transferMoney');
serverNuiCallback('renameAccount');
serverNuiCallback('convertAccountToShared');
