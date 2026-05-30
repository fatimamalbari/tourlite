# Wireframe & Product Vision: TourAI

## The "Wow" Concept: Zero-Config Onboarding
Yes, you are exactly right. The goal is: **"Paste a snippet, describe your goal, and the tour builds itself."**

### How the AI Generation Works (Conceptual Flow)
1.  **Input**: Developer provides a high-level goal (e.g., "Show users how to create a new team").
2.  **Context**: The SDK "sees" the current DOM (labels, buttons, layout).
3.  **LLM Brain**: AI maps the goal to the actual buttons on the screen.
4.  **Output**: A JSON tour configuration with selectors, titles, and professional copy.

---

## Visual Wireframe (Week-by-Week)

### Week 1: The "Invisible" Infrastructure
**Goal**: The engine that moves the box.
- **The Tooltip**: A floating card with `[Back]` `[Next]` and a progress indicator `1/3`.
- **The Overlay**: A subtle dimming of the background that "punches a hole" around the target element.
- **The Code**: 
  ```tsx
  <TourProvider>
     <App />
  </TourProvider>
  ```

### Week 2: The "Smooth" Experience
**Goal**: Make it feel like a premium product.
- **Transitions**: The tooltip doesn't just teleport; it slides smoothly from the "Create" button to the "Settings" menu.
- **Spotlight**: An animated ring that draws the eye to the target.
- **Mobile View**: Tooltips transform into bottom-sheets on small screens.

### Week 3: The AI Builder (The Core)
**Goal**: The "TourAI Studio" (Chrome Extension or Floating Toolbar).
- **The "Magic Wand" Button**: A button that appears only for developers.
- **Input Field**: "What should this tour do?" -> *User types: "Explain the analytics chart"*
- **AI Processing**: A loading spinner appears while the SDK scans the page.
- **Live Preview**: The tour starts playing immediately based on AI suggestions. You can "Accept" or "Refine" the steps.

### Week 4: Distribution & Growth
**Goal**: Launch & Scale.
- **Dashboard**: A simple web app to see:
    - How many users finished the tour?
    - Which step caused the most drop-offs?
- **Landing Page**: "Generate your first tour in 60 seconds."

---

## The "Smart Targeting" Logic
Since it's AI-based, we aren't just looking for `#id`. We are looking for **Intent**:
- **Selector**: `button:has-text("Sign Up")`
- **Fallback**: If the CSS changes, the AI uses "Inference" (e.g., "Look for the primary blue button next to the Login link").

## Are we on the same page?
This vision means the developer **never writes a tooltip string**. They just provide the website and the goal, and TourAI does the rest.

**Does this wireframe align with your "Build in Public" vision?** If so, I'll update the master plan to prioritize the **AI Context Collector** (the part that reads the website) for next week.
