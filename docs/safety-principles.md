# Safety Principles & Ethical Design

Safe Mirror is built on a foundation of **Survivor-Centered Design**. Our primary goal is to empower survivors of image-based abuse without re-traumatizing them or compromising their safety.

## Core Pillars

### 1. Consent Verification
We never process data without explicit, informed consent.
- **Mechanism**: The "Consent Modal" intercepts all upload attempts.
- **Purpose**: Ensures users understand that while we analyze their media, they retain ownership and control.

### 2. Safety by Default
We assume the content may be distressing or dangerous.
- **Mechanism**: "Safe View Mode".
- **Implementation**: All analysis results and the original image remain blurred by default. The user must actively choose to "Reveal Content". This prevents accidental exposure to triggering imagery during the review process.

### 3. Data Sovereignty & Erasure
The user owns their evidence, not the platform.
- **Mechanism**: Immediate Erasure.
- **Implementation**: Every record in the "Evidence Locker" has a prominent **Erase** button. This action performs a hard delete of the file and its metadata from our storage immediately.

### 4. Transparent Analysis
We demystify the "Black Box" of AI.
- **Mechanism**: Explanatory scoring and confidence intervals.
- **Goal**: To provide actionable evidence, not just a binary "Fake/Real" judgment. We explain *why* something is flagged (e.g., "Metadata anomalies detected", "Compression artifacts inconsistent").

## Ethical AI Usage
Our detection models are trained on ethically sourced datasets. We do not generate deepfakes; we only detect them.
