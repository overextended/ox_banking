local oxTarget = GetConvar('ox_enableTarget', 'false') == 'true'

local ATMProps = {
	`prop_atm_01`,
	`prop_atm_02`,
	`prop_atm_03`,
	`prop_fleeca_atm`,
	`v_5_b_atm1`,
	`v_5_b_atm2`
}

local function createBankBlip(coords)
    local blip = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipSprite(blip, 207)
    SetBlipColour(blip, 2)
    SetBlipAsShortRange(blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString('Bank')
    EndTextCommandSetBlipName(blip)
end

local function openUI(isATM)
    local accounts = lib.callback.await('ox_banking:getPlayerAccounts')
    print(json.encode(accounts))
end

if not oxTarget then
    for i = 1, #locations do
        local location = locations[i]
        local point = lib.points.new(location, 1.5)
        function point:onEnter()
            lib.showTextUI('[E] - Access bank')
        end
        function point:onExit()
            lib.hideTextUI()
        end
        function point:nearby()
            if self.currentDistance <= 1.5 and IsControlJustPressed(0, 38) then
               openUI(false)
            end
        end
        createBankBlip(location)
    end
    CreateThread(function()
        local atmFound = nil
        local sleep = nil
        while true do
            local playerCoords = GetEntityCoords(cache.ped)
            if not atmFound then
                sleep = 1000
                for i = 1, #ATMProps do
                    local atm = GetClosestObjectOfType(playerCoords.x, playerCoords.y, playerCoords.z, 1.5, ATMProps[i], false)
                    if atm ~= 0 then
                        atmFound = GetEntityCoords(atm)
                        if atmFound then lib.showTextUI('[E] - Access ATM') end
                    end
                end
            else
                sleep = 0
                if #(playerCoords - atmFound) < 2 then
                    if IsControlJustReleased(0, 38) then
                        openUI(true)
                        -- TODO: hide text ui and don't check input
                    end
                else
                    atmFound = nil
                    lib.hideTextUI()
                end
            end
            Wait(sleep)
        end
    end)
else
    exports.ox_target:addModel(ATMProps, {
        {
            name = 'access_atm',
            icon = 'fa-solid fa-money-check',
            label = 'Access ATM',
            onSelect = function()
                openUI(true)
            end,
        }
    })
    for i = 1, #targets do
        exports.ox_target:addBoxZone({
            coords = targets[i].coords,
            size = targets[i].size,
            rotation = targets[i].rotation,
            debug = true,
            interactionDistance = 1.3,
            drawSprite = true,
            options = {
                {
                    name = 'access_bank',
                    icon = 'fa-solid fa-dollar-sign',
                    label = 'Access bank',
                    onSelect = function()
                        openUI(false)
                    end,
                }
            }
        })
        createBankBlip(targets[i].coords)
    end
end
