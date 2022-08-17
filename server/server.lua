local accounts = {}

lib.callback.register('ox_banking:getPlayerAccounts', function()
    local player = Ox.GetPlayer(source)
    local playerAccounts = {}
    if not accounts[player.charid] then
        accounts[player.charid] = player.getAccounts()
    end
    playerAccounts.bank = accounts[player.charid].get('bank')
    for group, _ in pairs(player.groups) do
        if not accounts[group] then
            accounts[group] = Ox.GetAccounts(group)
        end
        playerAccounts[group] = accounts[group].get('bank')
    end
    return playerAccounts
end)