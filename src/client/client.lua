if GetConvarInt('ox_banking:target', 0) == 1 then return end

local function onEnterBank()
    lib.showTextUI('[E] - Access bank')
end

local function onExitBank()
    lib.hideTextUI()
end

local function insideBank()
    if IsControlJustPressed(0, 38) then
        exports.ox_banking.openBank()
    end
end

local locations = lib.loadJson('data.locations')

for i = 1, #locations do
    lib.points.new({
        coords = locations[i],
        distance = 1.5,
        onEnter = onEnterBank,
        onExit = onExitBank,
        nearby = insideBank
    })
end

local atms = lib.loadJson('data.atms')

for i = 1, #atms do atms[i] = GetHashKey(atms[i]) end

local function findClosestAtm()
    if IsNuiFocused() or IsPauseMenuActive() then return end

    local x, y, z = cache.coords.x, cache.coords.y, cache.coords.z

    for i = 1, #atms do
        local atm = GetClosestObjectOfType(x, y, z, 1.5, atms[i], false, false, false)

        if atm > 0 then
            local atmCoords = GetEntityCoords(atm)

            lib.showTextUI('[E] - Access ATM')

            while #(GetEntityCoords(cache.ped) - atmCoords) <= 1.5 and not IsNuiFocused() and not IsPauseMenuActive() do
                if IsControlJustPressed(0, 38) then
                    exports.ox_banking.openATM()
                end

                Wait(0)
            end

            lib.hideTextUI()

            return true
        end
    end
end

CreateThread(function()
    while true do
        Wait(findClosestAtm() and 500 or 1000)
    end
end)
