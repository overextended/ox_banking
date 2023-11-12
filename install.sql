ALTER TABLE `accounts`
  ADD COLUMN `type` ENUM ('personal', 'shared', 'group') DEFAULT 'personal';
