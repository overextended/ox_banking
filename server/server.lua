local accounts = {}

local function firstToUpper(str)
    return (str:gsub("^%l", string.upper))
end

local function generateAccountId()
    local id = ''
    for i = 1, 12 do
        id = id .. math.random(1, 9)
    end
    return id
end

local function createDefaultAccounts(charId)
    accounts[charId] = {
        {
            id = generateAccountId(),
            name = 'Personal',
            owner = charId,
            balance = Ox.GetAccounts(charId).get('bank'),
            type = 'personal',
            isDefault = true,
            isPaycheck = false
        },
        {
            id = generateAccountId(),
            name = 'Paycheck',
            owner = charId,
            balance = Ox.GetAccounts(charId).get('paycheck'),
            type = 'personal',
            isDefault = false,
            isPaycheck = true
        }
    }
end

local function createGroupAccount(group)
    accounts[group] = {
        id = generateAccountId(),
        name = firstToUpper(group),
        owner = group,
        balance = Ox.GetAccounts(group).get('bank'),
        type = 'group',
        isDefault = false,
        isPaycheck = false,
    }
end

lib.callback.register('ox_banking:getPlayerAccounts', function()
    local player = Ox.GetPlayer(source)
    local playerAccounts = {}

    if not accounts[player.charid] then
        createDefaultAccounts(player.charid)
    end

    playerAccounts = accounts[player.charid]

    for k, _ in pairs(player.get('groups')) do
        local playerGroup = k
        if not accounts[playerGroup] then
            createGroupAccount(playerGroup)
        end
        playerAccounts[#playerAccounts+1] = accounts[playerGroup]
    end

    return playerAccounts
end)
