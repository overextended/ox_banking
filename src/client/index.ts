import type { Character } from '../common/typings';
import { hideTextUI } from '@overextended/ox_lib/client';
import { SendTypedNUIMessage, serverNuiCallback } from './utils';
import { getLocales } from '@overextended/ox_lib/shared';
import { OxAccountPermissions, OxAccountRole } from '@overextended/ox_core';
import { LoadJsonFile, Locale } from '@common/.';

let hasLoadedUi = false;
let isUiOpen = false;
let isATMopen = false;

function initUI() {
  if (hasLoadedUi) return;

  const accountRoles: OxAccountRole[] = GlobalState.accountRoles;
  const permissions = accountRoles.reduce(
    (acc, role) => {
      acc[role] = GlobalState[`accountRole.${role}`] as OxAccountPermissions;
      return acc;
    },
    {} as Record<OxAccountRole, OxAccountPermissions>
  );

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
  isATMopen = true;

  SendTypedNUIMessage('openATM', null);
  SetNuiFocus(true, true);
};

exports('openATM', openATM);

const openBank = () => {
  initUI();

  const playerCash: number = exports.ox_inventory.GetItemCount('money');
  isUiOpen = true;

  hideTextUI();

  SendTypedNUIMessage<Character>('openBank', { cash: playerCash });
  SetNuiFocus(true, true);
};

exports('openBank', openBank);

const createBankBlip = ([x, y, z]: number[]) => {
  const blip = AddBlipForCoord(x, y, z);
  SetBlipSprite(blip, 207);
  SetBlipColour(blip, 2);
  SetBlipAsShortRange(blip, true);
  BeginTextCommandSetBlipName('STRING');
  AddTextComponentString(Locale('bank'));
  EndTextCommandSetBlipName(blip);
};

if (GetConvarInt('ox_banking:target', 0)) {
  const atms = LoadJsonFile<typeof import('../../data/atms.json')>('data/atms.json').map((value) => GetHashKey(value));
  const targets = LoadJsonFile<typeof import('../../data/targets.json')>('data/targets.json');

  const atmOptions = {
    name: 'access_atm',
    icon: 'fa-solid fa-money-check',
    label: Locale('target_access_atm'),
    onSelect: openATM,
    distance: 1.3,
  };

  const bankOptions = {
    name: 'access_bank',
    icon: 'fa-solid fa-dollar-sign',
    label: Locale('target_access_bank'),
    onSelect: openBank,
    distance: 1.3,
  };

  exports.ox_target.addModel(atms, atmOptions);

  targets.forEach((target) => {
    exports.ox_target.addBoxZone({
      coords: target.coords,
      size: target.size,
      rotation: target.rotation,
      debug: true,
      drawSprite: true,
      options: bankOptions,
    });

    createBankBlip(target.coords);
  });
} else LoadJsonFile<typeof import('../../data/locations.json')>('data/locations.json').forEach(createBankBlip);

RegisterNuiCallback('exit', (_: any, cb: Function) => {
  isUiOpen = false;
  isATMopen = false;

  SetNuiFocus(false, false);

  cb(1);
});

on('ox_inventory:itemCount', (itemName: string, count: number) => {
  if (!isUiOpen || isATMopen || itemName !== 'money') return;

  SendTypedNUIMessage<Character>('refreshCharacter', { cash: count });
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
serverNuiCallback('getLogs');
serverNuiCallback('getInvoices');
serverNuiCallback('payInvoice');
