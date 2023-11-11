local locations = json.decode(LoadResourceFile(cache.resource, '/data/locations.json'))

local ATMProps = {
    `prop_atm_01`,
    `prop_atm_02`,
    `prop_atm_03`,
    `prop_fleeca_atm`,
    `v_5_b_atm1`,
    `v_5_b_atm`,
}

if GetConvar('ox_enableTarget', 'false') == 'true' then return end

for i = 1, #locations do
    local location = locations[i]
    local point = lib.points.new(vector3(location[1], location[2], location[3]), 1.5)
    function point:onEnter()
        lib.showTextUI('[E] - Access bank')
    end
    function point:onExit()
        lib.hideTextUI()
    end
    function point:nearby()
        if self.currentDistance <= 1.5 and IsControlJustPressed(0, 38) then
            exports.ox_banking.openBank()
        end
    end
end

CreateThread(function()
    while true do
        if not IsNuiFocused() and not IsPauseMenuActive() then
            local playerCoords = GetEntityCoords(cache.ped)
            for i = 1, #ATMProps do
                local atm = GetClosestObjectOfType(playerCoords.x, playerCoords.y, playerCoords.z, 1.5, ATMProps[i], false)
                if atm ~= 0 then
                    lib.showTextUI('[E] - Access ATM')
                    local atmCoords = GetEntityCoords(atm)
                    repeat
                        Wait(0)
                        local distance = #(GetEntityCoords(cache.ped) - atmCoords)
                        if IsNuiFocused() or IsPauseMenuActive() then
                            break
                        end
                        if IsControlJustPressed(0, 38) then
                            -- todo: open atm
                            exports.ox_banking.openBank()
                        end
                    until distance > 1.5
                    lib.hideTextUI()
                end
            end
        end
        Wait(1000)
    end
end)
