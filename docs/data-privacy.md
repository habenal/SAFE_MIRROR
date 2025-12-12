# Data Privacy & Security Architecture

Safe Mirror is designed with a "Privacy First" architecture. We understand the sensitivity of the data being analyzed.

## Encryption
All sensitive files (images and generated PDF reports) are encrypted at rest.
- **Algorithm**: AES-256-GCM.
- **Key Management**: Uses a master key (env: `MASTER_KEY`) to derive encryption keys.
- **Implementation**: Files are encrypted immediately upon analysis completion. Decryption only occurs in memory when the report is requested by the authenticated user.

## Storage
- **Location**: Local filesystem (`backend/src/storage`).
- **Metadata**: Stored in a local JSON database (`locker.json`).
- **Isolation**: The storage directory is excluded from git tracking (`.gitignore`) to prevent accidental leakage sharing code.

## Data Retention
- **Policy**: Data is retained until explicitly deleted by the user.
- **User Control**: The "Erase" function provides the user absolute control to scrub their data from the system instantly.

## Network Security
- **Local Operation**: The current MVP is designed to run locally (localhost), ensuring data never leaves the user's machine unless they deploy it to a server.
- **Integration**: Communication between Backend and Model Server is over internal Docker networks or localhost.
