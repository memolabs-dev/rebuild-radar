# Mobile Explorer → Rebuild Radar: real exporter contract test

Rebuild Radar validates JSONL read-only via `node scripts/preview-observations.mjs file.jsonl`.

To recheck both repositories with **the actual Swift exporter**, on macOS with Swift/Xcode:

```sh
node scripts/verify-mobile-interop.mjs
```

The script clones the public Mobile Explorer repository into a temporary folder, runs its `testExportFixtureForRadarInterop` XCTest to write a JSONL export, and validates that file with the Radar validator. It removes the temporary folder and publishes nothing.

To validate a Mobile Explorer branch before merge, set `MOBILE_EXPLORER_REF` to the branch name.

Only the JSONL v0.1 technical contract is tested. iPhone/USB access, privacy review, authorization and factual software compatibility remain separate tasks.
