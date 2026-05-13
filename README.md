# Lucky Paws 🐾

A full-stack pet adoption and e-commerce platform where users can browse adoptable animals, shop for pet supplies, read pet care blogs, and find their perfect pet companion with the help of AI.

**Live site:** https://lucky-paws.vercel.app

---

## Features

- **Browse & Adopt** — Browse adoptable animals with filters by type, size, gender, and location
- **Find My Perfect Pet** — AI-powered questionnaire (Groq / Llama 3.3) that analyzes your lifestyle and recommends your ideal pet
- **Pet Shop** — Browse and purchase pet supplies and accessories
- **Blog** — Read and write pet care articles
- **User Accounts** — Sign up, sign in, manage your profile and favorite animals
- **Shopping Cart** — Add products and proceed to checkout
- **Admin Dashboard** — Manage listings, products, and blog posts

---

## Tech Stack

### Frontend (`/fe`)
| Tool | Purpose |
|------|---------|
| Next.js 13 (Pages Router) | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Headless UI | Accessible components |
| Axios | API requests |
| Groq SDK | AI pet matcher feature |
| React Toastify | Notifications |

### Backend (`/be`)
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| JWT + bcrypt | Authentication |
| Cloudinary + Multer | Image uploads |
| Nodemailer | Email service |

---

## Project Structure

```
lucky-paws/
├── fe/                  # Next.js frontend
│   ├── src/
│   │   ├── pages/       # Routes (animals, products, blog, auth, pet-match)
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context (user, cart, favourites)
│   │   ├── hooks/       # Data fetching hooks
│   │   └── utils/       # API base URL, TypeScript interfaces
│   └── .env.local       # Frontend environment variables
│
└── be/                  # Express backend
    ├── controller/      # Route handlers
    ├── models/          # Mongoose schemas
    ├── routes/          # API route definitions
    ├── middlewares/     # Logger, error handler
    └── utils/           # Email utility
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Cloudinary account (for image uploads)
- Groq API key (free at console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/itsTaami/lucky-paws.git
cd lucky-paws
```

### 2. Set up the backend
```bash
cd be
npm install
```

Create `be/.env`:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend:
```bash
npm run dev
```

### 3. Set up the frontend
```bash
cd fe
npm install
```

Create `fe/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
GROQ_API_KEY=your_groq_api_key
```

Start the frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## AI Feature — Find My Perfect Pet

The **Find My Perfect Pet** page (`/pet-match`) is powered by Groq's Llama 3.3 70B model. Users answer 8 questions about their lifestyle, home type, experience, and preferences. The AI returns:

- A personalized recommendation paragraph
- The best pet type for their profile
- Ideal traits to look for
- Matching pets from the database

---

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set the root directory to `fe`
4. Add environment variables (`NEXT_PUBLIC_API_URL`, `GROQ_API_KEY`)
5. Deploy

### Backend → Vercel / Railway
The backend has a `vercel.json` configured. Deploy from the `be` directory or use [Railway](https://railway.app) for a persistent server.

---

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `fe/.env.local` | Backend API base URL |
| `GROQ_API_KEY` | `fe/.env.local` | Groq API key for AI pet matcher |
| `MONGO_URL` | `be/.env` | MongoDB connection string |
| `JWT_SECRET` | `be/.env` | Secret for signing JWT tokens |
| `CLOUDINARY_*` | `be/.env` | Cloudinary image upload credentials |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push and open a pull request
