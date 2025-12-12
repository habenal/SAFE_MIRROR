# SAFE MIRROR 

> **Detect. Protect. Empower.**

Safe Mirror is a **survivor-centered** digital safety tool designed to detect deepfakes and manipulated media. It prioritizes user safety, privacy, and evidence ownership.

![Status](https://img.shields.io/badge/Status-Beta-blue) ![License](https://img.shields.io/badge/License-MIT-green)

##  Key Features

- ** Survivor-Centered Design**: Built with consent modals, "Safe View" blurring, and non-triggering aesthetics.
- ** Advanced AI Analysis**: Detects deepfake artifacts and assesses nudity risk scores.
- ** Encrypted Evidence Locker**: Securely stores analysis reports with AES-256 encryption.
- ** Immediate Erasure**: complete data sovereignty with one-click permanent deletion.
- ** Evidence Reports**: Generates downloadable PDF reports for documentation.

##  Technology Stack

- **Frontend**: React + Vite + TailwindCSS (Glassmorphism/Light Theme)
- **Backend**: Node.js + Express (Encryption & Storage Logic)
- **Model Server**: Python + Flask (Inference Engine)
- **Infrastructure**: Docker & Nginx

##  Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local dev)

### Quick Start (Production)
```bash
./infra/deployment/deploy.sh
# Access at http://localhost
```

### Development Setup
1. **Start Model Server**:
   ```bash
   cd model-server
   python app.py
   ```
2. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```
3. **Start Frontend**:
   ```bash
   cd frontend/safe_mirror_frontend
   npm run dev
   ```

##  Documentation

Detailed documentation is available in the `docs/` directory:
- [**Safety Principles**](docs/safety-principles.md): Our ethical design philosophy.
- [**API Specification**](docs/api-spec.md): Backend endpoint details.
- [**Data Privacy**](docs/data-privacy.md): Encryption and retention logic.
- [**Roadmap**](docs/roadmap.md): Future plans and features.

##  License

This project is licensed under the [MIT License](LICENCE).
