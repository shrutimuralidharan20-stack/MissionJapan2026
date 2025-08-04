# Fitness Tracker App

A super‑lightweight Next.js + Firebase web app that lets three participants log workouts and automatically tallies CAD $5 or ₹100 per workout.

## Quick start (non‑coder friendly)

1. **Create a free Firebase project**  
   • Go to <https://console.firebase.google.com> → *Add project* → disable Google Analytics.  
   • In *Build › Authentication* enable **Email/Password** sign‑in (no extra settings).  
   • In *Build › Firestore Database* create the database (production mode is fine).
2. **Grab your web‑app config**  
   *Project settings › General › Your apps* → click **</>** icon → register app → copy the config JSON.
3. **Deploy with one click**  
   Log in to <https://vercel.com/import> → choose **GitHub** → paste the repo URL you’ll create from this code (or upload ZIP).  
   During the Vercel setup add these environment variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=xxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
   NEXT_PUBLIC_FIREBASE_APP_ID=1:xxx:web:xxx
   ```
4. **Invite the three users**  
   In Firebase Auth → *Users* → **Add user** for each participant (use any email).  
   Then create a *users* collection in Firestore with docs whose IDs equal the auth `uid`:
   ```
   displayName: "Person A"
   currency: "CAD"
   ratePerWorkout: 5
   ```
   (repeat for Person B & Person C with INR/100)
5. **Share the Vercel URL** – each person logs in, hits **Log Workout**, and the dashboard updates live.

---

## Local development

```bash
npm install
npm run dev
```
Visit <http://localhost:3000>.

---

## Stack
* Next.js 14 (app router, React 18)
* Firebase v10 (Auth + Firestore)
* Tailwind CSS
* Recharts for the money bar

---

## Roadmap
- Streak badges
- Push notifications via Firebase Messaging
- CSV export
