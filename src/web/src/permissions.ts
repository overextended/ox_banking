import { AccountPermissions, AccountRole } from '../../common/typings';
import { isEnvBrowser } from './utils/misc';

export type Permissions = Record<AccountRole, AccountPermissions>;

const permissions: Permissions = {} as Permissions;

export function setPermissions(data: Permissions) {
  for (const [key, value] of Object.entries(data)) {
    permissions[key as AccountRole] = value;
  }
}

export function hasPermission(permission: keyof AccountPermissions, role: AccountRole): boolean {
  return !!permissions[role][permission];
}

const WEB_PERMISSIONS: Permissions = {
  viewer: {
    addUser: false,
    closeAccount: false,
    deposit: false,
    manageAccount: false,
    manageUser: false,
    transferOwnership: false,
    viewHistory: false,
    withdraw: false,
    removeUser: false,
    sendInvoice: false,
    payInvoice: false,
  },
  contributor: {
    addUser: false,
    closeAccount: false,
    deposit: true,
    manageAccount: false,
    manageUser: false,
    transferOwnership: false,
    viewHistory: false,
    withdraw: false,
    removeUser: false,
    sendInvoice: false,
    payInvoice: false,
  },
  manager: {
    addUser: true,
    closeAccount: false,
    deposit: true,
    manageAccount: true,
    manageUser: true,
    transferOwnership: false,
    viewHistory: true,
    withdraw: true,
    removeUser: false,
    sendInvoice: false,
    payInvoice: false,
  },
  owner: {
    addUser: true,
    closeAccount: true,
    deposit: true,
    manageAccount: true,
    manageUser: true,
    transferOwnership: true,
    viewHistory: true,
    withdraw: true,
    removeUser: false,
    sendInvoice: false,
    payInvoice: false,
  },
};

if (isEnvBrowser()) {
  for (const [key, value] of Object.entries(WEB_PERMISSIONS)) {
    permissions[key as AccountRole] = value;
  }
}

export default permissions as typeof permissions;
