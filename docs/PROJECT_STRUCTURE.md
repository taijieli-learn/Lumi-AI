# Lumi Project Structure

The project now separates the marketing site from the product demo.

## Routes

- `/` renders the public landing page.
- `/demo` renders the interactive HTML product demo.

## Source Folders

- `client/src/pages/landing/`
  - public homepage narrative
  - brand story, positioning, CTA
  - should feel like a product website

- `client/src/pages/demo/`
  - product prototype and click-through flows
  - mock data, interaction states, app-like screens
  - should feel like using Lumi, not reading about Lumi

- `client/public/assets/lumi/`
  - shared visual assets for both landing and demo

## Product Demo Principle

The demo should not become a knowledge-base dashboard. It should show the core Lumi loop:

`cross-app saves -> intent recognition -> proactive card -> lightweight action -> memory update`

The first demo can be fully mock-data driven. We are validating the interaction model and story, not backend integrations.

