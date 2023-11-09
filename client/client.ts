import type { Vector3 } from '../typings';
import targets from '../data/targets.json';
import locations from '../data/locations.json';
import { serverNuiCallback } from 'utils';

const usingTarget = GetConvar('ox_enableTarget', 'false') == 'true';

const ATM_PROPS = [
  GetHashKey(`prop_atm_01`),
  GetHashKey(`prop_atm_02`),
  GetHashKey(`prop_atm_03`),
  GetHashKey(`prop_fleeca_atm`),
  GetHashKey(`v_5_b_atm1`),
  GetHashKey(`v_5_b_atm`),
];

const createBankBlip = (coords: Vector3) => {
  const blip = AddBlipForCoord(coords.x, coords.y, coords.z);
  SetBlipSprite(blip, 207);
  SetBlipColour(blip, 2);
  SetBlipAsShortRange(blip, true);
  BeginTextCommandSetBlipName('STRING');
  AddTextComponentString('Bank');
  EndTextCommandSetBlipName(blip);
};

if (!usingTarget) {
  for (let i = 0; i < locations.length; i++) {
    const [x, y, z] = locations[i];

    createBankBlip({ x, y, z });
  }
}

if (usingTarget) {
  exports.ox_target.addModel(ATM_PROPS, [
    {
      name: 'access_atm',
      icon: 'fa-solid fa-money-check',
      label: 'Access ATM',
      onSelect: () => {
        console.log('OPEN UI');
      },
    },
  ]);

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    const [x, y, z] = target.coords;

    exports.ox_target.addBoxZone({
      coords: { x, y, z },
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
            console.log('Open UI');
          },
        },
      ],
    });

    createBankBlip({ x, y, z });
  }
}
;

RegisterNuiCallback('exit', () => {
  SetNuiFocus(false, false);
});

serverNuiCallback('getAccounts');
serverNuiCallback('createAccount');
serverNuiCallback('deleteAccount');
