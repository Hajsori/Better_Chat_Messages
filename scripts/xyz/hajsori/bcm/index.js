import * as Minecraft from "@minecraft/server";

Minecraft.system.beforeEvents.startup.subscribe((event) => {
    event.customCommandRegistry.registerEnum("bcm:parameters", ["set", "get", "reset"])
    event.customCommandRegistry.registerCommand(
        {
            name: "bcm:chatlayout",
            description: "Set or reset a player's chat message layout",
            permissionLevel: Minecraft.CommandPermissionLevel.GameDirectors,
            cheatsRequired: false,
            mandatoryParameters: [
                {
                    name: "bcm:parameters",
                    type: Minecraft.CustomCommandParamType.Enum
                },
                {
                    name: "player",
                    type: Minecraft.CustomCommandParamType.PlayerSelector
                }
            ],
            optionalParameters: [
                {
                    name: "layout",
                    type: Minecraft.CustomCommandParamType.String
                }
            ]
        },
        (origin, parameter, players, layout) => {
            if (parameter === "set") {
                for (const player of players) {
                    player.setDynamicProperty("bcm:chatlayout", layout);
                }

                return {
                    status: Minecraft.CustomCommandStatus.Success,
                    message: `Set chat layout of §l${players.map((player) => player.name).join(", ")} §rto §l${layout}`
                }
            } else if (parameter === "get") {
                let currentLayouts = [];
                for (const player of players) {
                    const currentLayout = player.getDynamicProperty("bcm:chatlayout") || "<@s> $message";

                    currentLayouts[currentLayout] = currentLayouts[currentLayout] || [];
                    currentLayouts[currentLayout].push(player.name);
                }

                let message = "Current chat layouts:";
                for (const [layout, playerNames] of Object.entries(currentLayouts)) {
                    message += `\n§l${playerNames.join(", ")} §r=> §l${layout}`;
                }

                return {
                    status: Minecraft.CustomCommandStatus.Success,
                    message
                }
            } else if (parameter === "reset") {
                for (const player of players) {
                    player.setDynamicProperty("bcm:chatlayout");
                }

                return {
                    status: Minecraft.CustomCommandStatus.Success,
                    message: `Reset chat layout of §l${players.map((player) => player.name).join(", ")}§r to default`
                }
            }
        }
    );
});

Minecraft.world.beforeEvents.chatSend.subscribe((event) => {
    const layout = event.sender.getDynamicProperty("bcm:chatlayout");
    if (layout) {
        const formattedMessage = layout
            .replace("@s", event.sender.name)
            .replace("\\n", "\n")
            .replace("$nametag", event.sender.nameTag)
            .replace("$message", event.message);

        event.cancel = true;
        Minecraft.world.sendMessage(formattedMessage);
    }
});