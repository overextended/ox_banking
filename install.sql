ALTER TABLE `accounts`
  ADD COLUMN `type` ENUM ('personal', 'shared', 'group') DEFAULT 'personal';

CREATE TABLE IF NOT EXISTS `ox_banking_accounts_access`
(
  `id`        INT AUTO_INCREMENT
    PRIMARY KEY,
  `accountId` INT(6) UNSIGNED                          NOT NULL,
  `stateId`   VARCHAR(7)                               NOT NULL,
  `role`      ENUM ('contributor', 'manager', 'owner') NOT NULL,
  CONSTRAINT `ox_banking_accounts_access_accounts_id_fk`
    FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`)
      ON DELETE CASCADE,
  CONSTRAINT `ox_banking_accounts_access_characters_stateId_fk`
    FOREIGN KEY (`stateId`) REFERENCES `characters` (`stateId`)
      ON DELETE CASCADE
);
