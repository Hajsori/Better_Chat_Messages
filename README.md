[![Join us on Discord](https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/social/discord-plural_vector.svg)](https://discord.gg/GapBXPpZCy) [![Available on CurseForge](https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/available/curseforge_vector.svg)](https://www.curseforge.com/minecraft-bedrock/scripts/better-chat-messages)

With this pack you can edit how chat messages from players look like in chat with the new `/chatlayout` command. All what you need to do is to write `/chatlayout set <player> "<new-layout>"`.

`@s` in the Nametag it will automatically replace with the players name or the type ID from the entity, `$nametag` will be replaced with the players nametag, `$message` will be replaced with the original message, and with `\\n` you can create a new line.


Examples:
- `/chatlayout set @p "@s: $message"`
- `/chatlayout set @a[tag=moderator] "§8[§9Moderator§8] §f@s §8>> §7$message"`
- `/chatlayout set @a "$nametag §8>> §f$message"`
