# AdaptiveArmorSystem

> The world's first unified cross-domain adaptive protective systems dashboard — a single tactical HUD interface that monitors, visualizes, and manages next-generation armor and protective equipment across land, air, sea, space, and emergency operations.

![License](https://img.shields.io/badge/license-Proprietary-red) ![Language](https://img.shields.io/badge/language-TypeScript-3178c6) ![Framework](https://img.shields.io/badge/framework-React%20%2B%20Vite-646cff) ![Database](https://img.shields.io/badge/database-PostgreSQL%20%2F%20Neon-4169e1) ![UI](https://img.shields.io/badge/ui-Shadcn%20%2F%20Radix-000000)

---

## Overview

**AdaptiveArmorSystem** is a React/TypeScript tactical command dashboard that solves a problem no existing open-source or commercial platform has attempted: unifying the visualization and monitoring of adaptive protective equipment across every major operational domain — from infantry combat helmets and combat mechs to aerospace fighter jets, submarines, deep-sea dive systems, astronaut EVA suits, and first-responder gear — under a single adaptive HUD-style interface backed by a live relational database.

Today, protective systems in defense, aerospace, maritime, and emergency services are monitored in silos. A soldier's exoskeletal armor system has no shared interface language with an astronaut's EVA suit or a firefighter's smart helmet. AdaptiveArmorSystem proposes and demonstrates the architectural answer to that fragmentation: a domain-agnostic tactical frame component that renders any protective system's telemetry, configuration, and status into a unified, operationally intuitive HUD.

This repository is a **working front-end prototype** — complete with futuristic schematic assets, a tactical frame component, an interactive dashboard, and a PostgreSQL backend via Drizzle ORM on Neon serverless — that is immediately usable as:

- A **licensable UI/UX prototype** for defense simulation or training platform vendors
- A **seed prototype** for a SBIR/STTR Phase I or Phase II proposal targeting next-generation protective equipment management
- A **front-end accelerator** for defense prime contractors or aerospace companies building live armor telemetry platforms
- A **demonstration asset** for investor or acquirer pitches in the defense tech space

---

## Key Features

- **Nine Operational Domains, One Interface** — Dedicated schematic dashboard views for tactical infantry helmets, armored tanks, combat mech robots, police riot gear, aerospace fighter jets, tactical submarines, deep-sea diver helmets, astronaut EVA helmets, and firefighter/rescue helmets
- **Tactical Frame Architecture** — A reusable `TacticalFrame` component that wraps any protective system schematic in a consistent HUD chrome, providing a shared visual language across all domains
- **PostgreSQL-Backed State** — Drizzle ORM integration with Neon serverless PostgreSQL for persistent armor system configuration, telemetry records, and status data — ready for real-time sensor feed integration
- **Futuristic Schematic Asset Library** — Nine high-fidelity generated schematic images covering military, aerospace, maritime, and emergency services equipment, purpose-built for HUD-style presentation
- **Full Shadcn/Radix UI Component Suite** — Accordion, carousel, chart, dialog, sidebar, progress, and 30+ additional accessible UI primitives pre-integrated and themed for tactical aesthetics
- **Vite-Powered Development** — Sub-second HMR, optimized production builds, and a clean monorepo structure separating client and server concerns
- **Domain-Agnostic Data Model** — The shared schema is designed to represent any protective system's sensor inputs, adaptation states, and operational parameters without domain-specific hardcoding

---

## How It Works

### Architecture

```
client/
  src/
    App.tsx                          # Root application router and theme provider
    components/
      tactical/
        frame.tsx                    # Core HUD frame component — wraps any domain's schematic
      ui/                            # Full Shadcn/Radix component library (30+ components)
attached_assets/
  generated_images/                  # Nine domain-specific schematic PNGs
server/ (Drizzle ORM + Neon)         # PostgreSQL schema, queries, and API layer
shared/
  schema.ts                          # Drizzle table definitions shared across client and server
```

### The Tactical Frame Component

The `TacticalFrame` component (`client/src/components/tactical/frame.tsx`) is the architectural core of the system. It provides the persistent HUD chrome — status overlays, domain identifiers, system health indicators, and navigation controls — while accepting any domain's schematic and telemetry data as props. This separation of frame from content is what makes the cross-domain unification possible: adding a new protective system domain requires only a new schematic asset and a data mapping, not a new interface paradigm.

### Database Layer

The PostgreSQL schema (defined in `shared/schema.ts` via Drizzle ORM) models the core entities of any adaptive protective system:

- **System Profiles** — Domain type, system identifier, operational classification
- **Sensor Readings** — Timestamped telemetry entries linked to a system profile
- **Adaptation States** — Current active configuration or protection mode for each system
- **Operational Events** — Log of status changes, alerts, and adaptation triggers

Drizzle's type-safe query builder ensures schema changes propagate automatically to the TypeScript client, maintaining end-to-end type safety from database to UI.

### Domain Coverage

| Domain | System | Schematic Asset |
|---|---|---|
| Land / Military | Tactical Infantry Helmet | `futuristic_tactical_helmet_schematic.png` |
| Land / Military | Armored Tank | `futuristic_armored_tank_schematic.png` |
| Land / Military | Combat Mech Robot | `futuristic_combat_mech_robot_schematic.png` |
| Law Enforcement | Police Riot Helmet | `futuristic_police_riot_helmet_schematic.png` |
| Aerospace | Fighter Jet | `futuristic_aerospace_fighter_jet_schematic.png` |
| Maritime | Tactical Submarine | `futuristic_tactical_submarine_schematic.png` |
| Deep Sea | Diver Helmet | `futuristic_deep_sea_diver_helmet_schematic.png` |
| Space | Astronaut EVA Helmet | `futuristic_eva_astronaut_helmet_schematic.png` |
| Emergency Services | Firefighter Rescue Helmet | `futuristic_firefighter_rescue_helmet_schematic.png` |

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or pnpm
- A [Neon](https://neon.tech) PostgreSQL database (or any compatible PostgreSQL 15+ instance)

### 1. Clone the Repository

```bash
git clone https://github.com/Dessiidoo/AdaptiveArmorSystem.git
cd AdaptiveArmorSystem
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
```

### 4. Initialize the Database

```bash
npm run db:push
```

This applies the Drizzle schema to your PostgreSQL instance.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000` (or the port configured in your Vite config).

### 6. Build for Production

```bash
npm run build
npm run start
```

---

## Usage

Once running, the dashboard presents the unified tactical HUD interface. Navigate between the nine domain views using the sidebar or domain selector. Each view renders the corresponding schematic asset inside the `TacticalFrame` component with domain-appropriate status overlays and (when connected to a live database) real-time telemetry data.

For enterprise integration, the database layer is designed to accept sensor feed inputs via the server-side API routes. Replace the seed/mock data with live telemetry streams from physical or simulated protective equipment sensors to activate real-time monitoring.

---

## Why This Exists

Modern protective equipment — whether a soldier's smart exoskeleton, a first responder's connected helmet, or an astronaut's EVA suit — is becoming increasingly sensor-rich and software-defined. Yet the operator interfaces for these systems remain domain-isolated, vendor-locked, and architecturally incompatible.

AdaptiveArmorSystem demonstrates that a single, domain-agnostic HUD architecture can serve all of these operational contexts simultaneously. For defense contractors, simulation companies, and first-responder tech vendors, this prototype eliminates months of front-end R&D and provides an immediately demonstrable, visually compelling foundation for next-generation protective equipment management platforms.

This project is particularly well-positioned as:
- A **SBIR/STTR seed prototype** — demonstrating feasibility of a unified cross-domain protective systems interface for DoD or DHS solicitations
- A **training simulation UI** — the schematic-and-HUD model maps directly to virtual/mixed-reality training environments
- A **commercial product foundation** — the architecture scales from nine domains today to any number of connected protective systems

---

## Commercial & Licensing Inquiries

This repository represents proprietary IP. For licensing, acquisition, or integration partnership inquiries, contact the repository owner directly via GitHub.

Estimated commercial value ranges:
- **Outright IP Sale:** $15,000 – $75,000
- **Enterprise License (per year):** $5,000 – $20,000 per integration
- **Defense Tech Acquisition / SBIR Seed Prototype:** $50,000 – $250,000

---

## License

All rights reserved. This software and its associated assets are proprietary. No license to use, copy, modify, or distribute is granted without express written permission from the copyright holder. See [LICENSE](./LICENSE) for full terms.
