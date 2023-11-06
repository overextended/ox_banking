import { onClientCallback } from "@overextended/ox_lib/server";
import type { Account } from "../typings";

onClientCallback("getAccounts", (playerId): Account[] => {
  return [
    {
      balance: 13000,
      id: 133222,
      isDefault: true,
      type: "personal",
      label: "Personal",
      owner: "Svetozar Miletić",
    },
  ];
});
