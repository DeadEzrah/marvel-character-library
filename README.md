# Marvel Character Library

Expandable Actor compendiums for the Marvel Multiverse system and Marvel Encounter Framework.

## Compendiums

- **Heroes** - player-facing heroes and allies
- **Villains** - major antagonists
- **Minions & NPCs** - minions, civilians, supporting characters, and encounter reinforcements

The included entries are original starter templates, not official Marvel character statistics. Add only content you are authorized to use. Keep source Actors in `packs/_source/<pack>/` and run:

```powershell
npm run build
```

Encounter packs should reference Actors by stable UUID:

```text
Compendium.marvel-character-library.minions.Actor.mefAlienVangrd01
```

Do not change an Actor's `_id` after an encounter pack begins referencing it.

## Installation

Copy or link this repository to:

```text
{Foundry User Data}\Data\modules\marvel-character-library
```

Enable **Marvel Character Library** before enabling **Marvel Encounter Packs**.
