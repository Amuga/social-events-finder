# **Mini-PRD: EventHub – Events Discovery & Sharing Platform**

## **For Whom**

Developers/employers visiting this portfolio should see:

- A person who can build polished, modern Next.js applications
- Someone who understands **full-stack thinking** (frontend + data layer)
- Someone with design sensibility, UX attention, **and accessibility best practices**

---

## **Problem & Need**

**Problem**: It's hard to discover interesting social events (concerts, meetups, parties, festivals) happening nearby, and when you find one, there's no easy way to save or share it.

**Need**: A simple, accessible hub where users can browse, discover, save, and share events.

---

## **Central User Flow** (Demonstrable Core)

1. **Land on home** → see value prop + featured/upcoming events
2. **Browse/Search** → filter events by category, date, or search term
3. **Click event** → see full details (date, time, location, description, image)
4. **Save/Share** → heart/favorite the event, copy link
5. **View saved** → see favorited events (localStorage persists)

**Success metric for week 1**: A visitor can complete steps 1–5 smoothly and accessibly.

---

## **MVP Scope**

### **Included**

- **Home page** – Hero + featured events grid + call-to-action
- **Events browse page** – List/grid of all events with filtering (category, date range)
- **Event detail page** – Full event card with image, date/time, location, description
- **Search** – Quick search by event title/category
- **Save/Favorite** – Heart icon, saves to localStorage (no backend write required)
- **View saved** – Page showing user's favorited events
- **Share** – Social share buttons (Twitter, Facebook) or copy-link modal
- **Responsive design** – Works on mobile, tablet, desktop
- **Accessibility** – WCAG 2.1 AA standards: semantic HTML, keyboard navigation, color contrast, focus indicators
- **Clean, modern UI** – Tailwind CSS, smooth interactions, attention to detail

### **Explicitly Out of Scope (Week 2+)**

- ❌ User authentication / accounts
- ❌ User-created events
- ❌ Persistent backend writes (read-only from json-server)
- ❌ Notifications
- ❌ Comments/reviews
- ❌ Advanced filtering (geolocation, recommendations)

---

## **Biggest Risk & Uncertainty**

**Risk 1**: Balancing polish (animations, interactions) with time constraints.

- **Mitigation**: Prioritize core functionality first (weeks 1–2), then add animations as time permits.

**Risk 2**: json-server setup complexity.

- **Mitigation**: Keep data schema simple (events array with id, title, date, location, category, image, description). Use `json-server` with default config for MVP.

---

## **Tech Stack & Key Decisions**

| Decision             | Choice                                          | Why                                                                                    |
| -------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Framework**        | Next.js (App Router)                            | Course requirement; modern, SEO-friendly                                               |
| **Styling**          | Tailwind CSS                                    | Minimal setup, massive component library                                               |
| **Data Layer**       | json-server (mock backend)                      | Simulates real API, teaches data fetching without backend complexity                   |
| **Data Persistence** | localStorage (favorites/saves)                  | Works on frontend, no server writes needed for MVP                                     |
| **Hosting**          | Vercel (front), json-server (dev/local)         | Simple deployment; json-server can run locally or on free tier (e.g., Render, Railway) |
| **Accessibility**    | WCAG 2.1 AA (semantic HTML, ARIA, keyboard nav) | Industry standard, shows professional practices                                        |
| **Auth**             | None (read-only MVP)                            | Keeps scope lean; events.                                                              |
| **Testing**          | Manual + accessibility audit (axe DevTools)     | Focus on working features + accessible design                                          |

---

## **Event Data Mock**

**Source**: json-server with a mock `events.json` file.

**Event categories** (no hackathons):

- Concerts & live music
- Meetups (tech, art, hobbies)
- Parties (house, club, themed)
- Festivals (food, art, cultural)
- Networking events
- Sports & outdoor activities
- Workshops & classes

**Sample data structure**:

```json
{
  "events": [
    {
      "id": 1,
      "title": "Indie Music Night at The Garage",
      "category": "Concerts",
      "date": "2024-09-15T20:00",
      "location": "Downtown, City Center",
      "description": "Live indie bands perform. Free entry, drinks available.",
      "image": "/images/indie-night.jpg",
      "attendees": 120
    }
  ]
}
```

---

## **User Stories (5 Core User Journeys)**

1. **As a visitor**, I want to land on an accessible, polished homepage so I can understand what this site offers
2. **As a visitor**, I want to filter events so I can find something interesting
3. **As a visitor**, I want to search events so I can find something interesting
4. **As a visitor**, I want to click an event and see full details with good contrast and readable fonts
5. **As a visitor**, I want to save favorite events and share them with friends

---

## **Accessibility Standards**

- **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<article>`, etc.
- **ARIA labels**: Form inputs, buttons, and interactive regions properly labeled (when necessary)
- **Keyboard navigation**: Tab through all interactive elements; focus indicators visible
- **Color contrast**: WCAG AA minimum (4.5:1 for body text, 3:1 for large text)
- **Images**: Alt text on all event images
- **Screen readers**: Tested with browser tools (or axe DevTools browser extension)
- **Focus management**: Clear visual focus indicators on buttons, links

---

## **Visual Direction / Inspiration**

- **Style**: Clean, modern, minimal
- **Colors**:
  --color-brand-navy: var(--color-slate-900);
  --color-brand-orange: var(--color-orange-500);
  --color-brand-cyan: var(--color-cyan-500);
  --color-brand-light: var(--color-slate-50);
  --color-brand-dark: var(--color-slate-800);
  --color-brand-border: var(--color-slate-200);
- **Typography**: Modern sans-serif, readable font sizes (min 16px for body)
- **Interactions**: Smooth hover/focus states, subtle animations (fade-ins, scale)
- **Accessibility**: High contrast mode support, focus indicators, no color-only information

---

## **Success Criteria by End of Week**

- ✅ All 5 user stories work end-to-end
- ✅ json-server running locally (or deployed) with event data
- ✅ localStorage saving/viewing favorites works
- ✅ Accessibility audit (axe DevTools) passes with no critical/serious issues
- ✅ Responsive and polished on mobile + desktop
- ✅ Code is clean, organized, documented
- ✅ You can demo it and explain the data flow to teacher

---

## **Weekly Timeline (From Course Outline)**

- **Mon (today)**: Finalize & present PRD to teacher ✅
- **Tue**: Get approval; feedback session
- **Wed**: Repo setup, Next.js scaffold, json-server config, design mockup
- **Thu–Fri**: Build features (home, browse, detail, save/share), test accessibility
- **Week 2**: Polish, responsive design, deploy to Vercel + json-server host

---

## **Data Strategy**

- **MVP**: Read-only from `events.json` served by json-server
- **Post-launch**: You can manually edit `events.json` to add/update events as needed (no backend write required for MVP)
- **Future**: If implementing user-created events, would require authentication + backend writes (deferred to week 2+)

---
