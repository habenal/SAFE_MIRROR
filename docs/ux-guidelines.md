# UX Guidelines: Survivor-Centered Design

**Goal**: Build a survivor‑centered, ethical, and demo‑ready interface that makes deepfake/image abuse detection accessible, trustworthy, and easy to use.

##  Visual Style
- **Theme**: Light, minimal, and professional using a neutral palette (White, Slate Gray, Soft Blue).
- **Tone**: Trustworthy and Safe. Avoid "hacker" or "dark web" aesthetics that could induce anxiety.
- **Typography**: Clean sans-serif fonts (Inter/System UI) for maximum readability.
- **Acents**: Use Blue for actions and Teal for trust indicators. Avoid aggressive Reds except for critical danger alerts.

##  Layout
### Landing Page (Dashboard)
- **Hero**: Clear statement of purpose ("Detect. Protect. Empower.").
- **Action Area**: Prominent upload widget wrapped in a **Consent Modal**.
- **Trust Indicators**: Icons explaining privacy, encryption, and erasure policies.

### Results Interface
- **Safe View Mode**: **Crucial**. Results and imagery must be blurred by default.
- **Controls**: "Reveal" button to opt-in to viewing content.
- **Scoring**: Clear confidence/probability bars.
- **Actions**: "View Report" and "Analyze Another".

### Evidence Locker
- **Purpose**: A dedicated space to manage past analyses.
- **View**: Table/List format.
- **Privacy**: No thumbnails shown in the list view to prevent accidental exposure.
- **Erasure**: Prominent "Erase" action for every record.

##  Core Components
- **Upload Widget**: Drag-and-drop with clear file type support.
- **Consent Modal**: Intercepts upload action to ensure user understands privacy implications.
- **Result Card**: Glass-like container with progressive disclosure of sensitive info.
- **Navigation**: Simple top-bar navigation between "Detection" and "Locker".

##  Safeguards
1.  **Consent First**: No processing happens without explicit agreement.
2.  **Blur Default**: Protect the user from seeing the deepfake immediately.
3.  **Immediate Erasure**: User retains the right to delete evidence instantly.
4.  **Local/Secure**: emphasize that data is encrypted and local (in MVP).
