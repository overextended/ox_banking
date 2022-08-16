local oxTarget = GetConvar('ox_enableTarget', 'false') == 'true'

local function createBankBlip(coords)
    local blip = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipSprite(blip, 207)
    SetBlipColour(blip, 2)
    SetBlipAsShortRange(blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString('Bank')
    EndTextCommandSetBlipName(blip)
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
                print('open ui')
            end
        end
        createBankBlip(location)
    end
end
