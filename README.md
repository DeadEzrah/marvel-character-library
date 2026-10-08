# Marvel Character Library

Expandable Actor compendiums for the Marvel Multiverse system and Marvel Encounter Framework.

## Compendiums

- **Heroes** - player-facing heroes and allies
- **Villains** - major antagonists
- **Minions & NPCs** - minions, civilians, supporting characters, and encounter reinforcements

## Scene-Ready Starter Roster

- New Hero
- Waitstaff
- Everyday Citizen
- Businessperson
- Emergency Medic
- Security Guard
- Street Tough
- Generic Minion
- Alien Vanguard
- Police Officer
- Firefighter
- Reporter
- Scientist
- Construction Worker
- City Driver
- Shopkeeper
- Helpful Bystander
- Panicked Civilian

Scene-ready records include an ability profile, Health and Focus, roleplaying guidance, token defaults, and at least one rollable attack. Duplicate and rename generic NPCs in the world when a recurring individual emerges.

The included entries are original starter templates, not official Marvel characters or character statistics. Official names, likenesses, biographies, artwork, sourcebook text, and copied statistics are prohibited. See [CONTENT-POLICY.md](CONTENT-POLICY.md).

Every public Actor source must carry reviewed provenance metadata. Validate and build with:

```powershell
npm run validate
npm run build
```

Encounter packs should reference Actors by stable UUID:

```text
Compendium.marvel-character-library.minions.Actor.mefAlienVangrd01
```

Do not change an Actor's `_id` after an encounter pack begins referencing it.

Recognizable or personally entered characters belong in the separate private `marvel-character-vault` repository. Public encounter packs must never require or reference that private vault.

## Installation

Copy or link this repository to:

```text
{Foundry User Data}\Data\modules\marvel-character-library
```

Enable **Marvel Character Library** before enabling **Marvel Encounter Packs**.
