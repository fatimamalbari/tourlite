# Plan: AI Generation Engine (The "Brain")

## Objective
Connect the **Scanner** output to **Google Gemini** to generate a fully functional, multi-step product tour from a simple text goal (e.g., "Show me how to use the dashboard").

## 1. Setup `@tour-ai/ai` Package
- Initialize the Google Gemini client in the `packages/ai` package.
- Create a structured function `generateTourFromContext` that:
    - Accepts a `goal` (string).
    - Accepts a `uiMap` (the output from `scanPage`).
    - Returns a `Tour` object (JSON).

## 2. Prompt Engineering (The Secret Sauce)
Develop a "System Prompt" that tells the LLM:
- "You are an expert UX Onboarding Engineer."
- "Given this list of UI elements, pick the best ones to fulfill the user's goal."
- "Output ONLY a JSON object that matches the `Tour` interface (selectors, titles, and copy)."
- "Ensure the copy is professional, encouraging, and context-aware (Tours & Travels, SaaS, etc.)."

## 3. The "Developer Toolbar" (Magic Wand UI)
Add a developer-only UI component to the SDK:
- A floating "Magic Wand" icon.
- A text input: "What should this tour explain?"
- A "Generate" button that triggers:
    1. `scanPage()` to get the current UI context.
    2. API call to Google Gemini with the goal + context.
    3. `startTour()` with the resulting AI-generated JSON.

## 4. Technical Implementation Steps
1.  **AI Wrapper**: Build the logic in `packages/ai/src/index.ts` using the Google Gemini SDK.
2.  **API Route (Demo App)**: Create a Next.js API route (`/api/generate-tour`) to securely handle the Gemini API key.
3.  **UI Bridge**: Create a `useAiTour` hook in the SDK to connect the scanner to the API route.
4.  **Polish**: Add a "Magic Loading" animation while the AI is thinking.

## 5. Verification
- **Test on Demo App**: Type "Explain the stats" and verify the AI points to the Revenue/User cards.
- **Error Handling**: Gracefully handle cases where the AI suggests a selector that doesn't exist.
