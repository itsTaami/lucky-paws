# Lucky Paws

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

---

## Project Structure

```
lucky-paws/
├── .claude/
│   └── commands/            # Claude Code skills (slash commands)
│       ├── pet-advisor.md   # /pet-advisor — domain expert skill
│       └── generate-listings.md  # /generate-listings — Ralph Wiggum loop
│
├── fe/                      # Next.js frontend
│   ├── src/
│   │   ├── pages/           # Routes (animals, products, blog, auth, pet-match)
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context (user, cart, favourites)
│   │   ├── hooks/           # Data fetching hooks
│   │   └── utils/           # API base URL, TypeScript interfaces
│   └── .env.local           # Frontend environment variables
│
└── be/                      # Express backend
    ├── controller/          # Route handlers
    ├── models/              # Mongoose schemas
    ├── routes/              # API route definitions
    ├── middlewares/         # Logger, error handler
    └── config/              # Database connection
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
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
PORT=4000
ALLOWED_ORIGINS=http://localhost:3000
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

## Claude Code Features

This project was developed using Claude Code and demonstrates three AI-assisted development techniques:

### 1. Project Skill — `/pet-advisor`
A custom Claude Code skill stored in `.claude/commands/pet-advisor.md`. Invoke it with `/pet-advisor` to get a domain expert that can:
- Write adoption listings for animals
- Generate pet care blog posts
- Review Lucky Paws codebase for correctness
- Suggest improvements to the AI pet matcher
- Generate realistic seed data for testing

### 2. Ralph Wiggum Autonomous Loop — `/generate-listings`
A Ralph Wiggum loop skill stored in `.claude/commands/generate-listings.md`. Run with `/loop generate-listings` to autonomously generate pet adoption listings in the correct database schema format. Used during development to populate the database with realistic test data.

### 3. AI Pet Matcher Feature
The `/pet-match` page uses Groq's Llama 3.3 70B model (via the `groq-sdk`) to analyze user responses to 8 lifestyle questions and return a personalized pet recommendation. The AI response includes a recommendation paragraph, best pet type, ideal traits, and matched pets from the database.

---

## API Documentation

Base URL: `https://lucky-paws-api.vercel.app` (production) or `http://localhost:4000` (local)

### Authentication
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/user/signup` | Register new user | `{ name, email, password, profileImg? }` |
| POST | `/user/signin` | Login | `{ email, password }` |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user` | Get all users |
| GET | `/user/:id` | Get user by ID |
| PUT | `/user/:id` | Update user |
| DELETE | `/user/:id` | Delete user |
| GET | `/user/:id/favorites` | Get user's favourite animals |
| POST | `/user/:id/favorites` | Add animal to favourites — body: `{ favoriteId }` |
| DELETE | `/user/:id/favorites` | Remove from favourites — body: `{ favoriteId }` |
| GET | `/user/:id/shoppingProduct` | Get user's cart |
| POST | `/user/:id/shoppingProduct` | Add product to cart — body: `{ productListId }` |
| DELETE | `/user/:id/shoppingProduct` | Remove from cart — body: `{ productListId }` |

### Animals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/animal` | Get all animals (populated with type + publisher) |
| POST | `/animal` | Create animal listing |
| GET | `/animal/filter/:type` | Get animals filtered by type ID |
| GET | `/animal/:id` | Get animal by ID |
| PUT | `/animal/:id` | Update animal |
| DELETE | `/animal/:id` | Delete animal |

**Animal body fields:** `name, imgs[{src}], age, size, gender, health, location, animaltype, publishedBy`

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product` | Get all products |
| POST | `/product` | Create product |
| GET | `/product/filter/:type` | Get products filtered by type ID |
| GET | `/product/:id` | Get product by ID |
| PUT | `/product/:id` | Update product |
| DELETE | `/product/:id` | Delete product |

**Product body fields:** `title, detail, imgList[{src}], price, productType`

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blog` | Get all blogs (sorted by date) |
| POST | `/blog` | Create blog post |
| GET | `/blog/:id` | Get blog by ID |
| PUT | `/blog/:id` | Update blog |
| DELETE | `/blog/:id` | Delete blog |

**Blog body fields:** `title, imgList[], description, publishedBy, blogCategory`

### Categories & Types
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/animalType` | List / create animal types |
| GET/PUT/DELETE | `/animalType/:id` | Get / update / delete animal type |
| GET/POST | `/productType` | List / create product types |
| GET/PUT/DELETE | `/productType/:id` | Get / update / delete product type |
| GET/POST | `/storeCategory` | List / create store categories |
| GET/PUT/DELETE | `/storeCategory/:id` | Get / update / delete store category |
| GET/POST | `/blogCategory` | List / create blog categories |
| GET/PUT/DELETE | `/blogCategory/:id` | Get / update / delete blog category |

### File Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload image to Cloudinary — multipart/form-data, field: `file` |

### Frontend API Routes (Next.js)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pet-match` | AI pet matcher — body: `{ lifestyle, homeType, experience, hoursHome, petType, size, hasKids, hasOtherPets }` |

---

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set root directory to `fe`
4. Add environment variables: `NEXT_PUBLIC_API_URL`, `GROQ_API_KEY`
5. Deploy

### Backend → Railway / Vercel
The backend has a `vercel.json` configured for serverless deployment. Alternatively, use [Railway](https://railway.app) for a persistent server with the `be` directory as root.

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | `fe/.env.local` | Backend API base URL |
| `GROQ_API_KEY` | `fe/.env.local` | Groq API key for AI pet matcher |
| `MONGO_URI` | `be/.env` | MongoDB connection string |
| `JWT_SECRET` | `be/.env` | Secret for signing JWT tokens |
| `CLOUD_NAME` | `be/.env` | Cloudinary cloud name |
| `API_KEY` | `be/.env` | Cloudinary API key |
| `API_SECRET` | `be/.env` | Cloudinary API secret |
| `PORT` | `be/.env` | Backend port (default: 4000) |
| `ALLOWED_ORIGINS` | `be/.env` | Comma-separated CORS origins |
