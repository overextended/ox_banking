import { AccountPermissions, AccountRole } from '../../common/typings';
import { isEnvBrowser } from './utils/misc';
import { locale } from '@overextended/ox_lib';

const permissions: Record<AccountRole, AccountPermissions> = {};

export function setPermissions(data: Record<AccountRole, AccountPermissions>) {
  for (const [key, value] of Object.entries(data)) {
    permissions[key] = value;
  }
}

export function hasPermission(permission: keyof AccountPermissions, role: AccountRole): boolean {
  return !!permissions[role][permission];
}

const WEB_PERMISSIONS: Record<AccountRole, AccountPermissions> = {
  viewer: {
    addUser: 0,
    closeAccount: 0,
    deposit: 0,
    manageAccount: 0,
    manageUser: 0,
    transferOwnership: 0,
    viewHistory: 0,
    withdraw: 0,
  },
  contributor: {
    addUser: 0,
    closeAccount: 0,
    deposit: 1,
    manageAccount: 0,
    manageUser: 0,
    transferOwnership: 0,
    viewHistory: 0,
    withdraw: 0,
  },
  manager: {
    addUser: 1,
    closeAccount: 0,
    deposit: 1,
    manageAccount: 1,
    manageUser: 1,
    transferOwnership: 0,
    viewHistory: 1,
    withdraw: 1,
  },
  owner: {
    addUser: 1,
    closeAccount: 1,
    deposit: 1,
    manageAccount: 1,
    manageUser: 1,
    transferOwnership: 1,
    viewHistory: 1,
    withdraw: 1,
  },
};

if (isEnvBrowser()) {
  for (const [key, value] of Object.entries(WEB_PERMISSIONS)) {
    permissions[key] = value;
  }
}

export default permissions as typeof permissions;
