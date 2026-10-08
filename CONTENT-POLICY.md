# Public Content Policy

The Marvel Character Library is a public repository for original, generic, or appropriately licensed Foundry Actor content. It is not a repository for reproducing official Marvel characters or sourcebook material.

## Allowed Content

- Original generic heroes, villains, civilians, creatures, and encounter NPCs.
- Original names, descriptions, statistics, tokens, and artwork created for this project.
- Public-domain or separately licensed material when its license permits redistribution and attribution is recorded.

## Prohibited Content

- Official Marvel character names, aliases, biographies, likenesses, logos, or artwork.
- Statistics copied or closely transcribed from official Marvel Multiverse RPG publications.
- Rules text, descriptions, tables, or other expressive content copied from sourcebooks.
- Images, tokens, or other assets without redistribution rights.
- Content scraped from commercial products, subscription services, or unofficial repositories without a compatible license.

## Required Provenance

Every JSON Actor under `packs/_source/` must include:

```json
{
  "flags": {
    "marvel-character-library": {
      "content": {
        "classification": "original",
        "creator": "Marvel Character Library Project",
        "provenance": "Created for this repository; not based on an official character.",
        "reviewedAt": "2026-10-08"
      }
    }
  }
}
```

Supported classifications are `original`, `licensed`, and `public-domain`. Licensed and public-domain entries must additionally record `license` and `sourceUrl`.

`npm run validate` enforces the required metadata. Passing validation confirms that the metadata is complete; it is not a legal determination.

## Private Character Vault

Recognizable or personally entered characters belong in the private `marvel-character-vault` repository or another private local module. Public encounter packs must not reference private-vault UUIDs or require the vault as a dependency.

If content ownership is uncertain, do not commit it to this repository.
