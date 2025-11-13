# Ramani Fashion India E-Commerce

## Overview

Ramani Fashion India is a full-stack e-commerce web application specializing in traditional Indian sarees and ethnic wear. The platform offers a sophisticated shopping experience with features such as product browsing, filtering, cart management, wishlist functionality, user authentication, order processing, and an integrated contact form. The project aims to provide a premium online shopping experience for traditional Indian fashion, combining elegant UI design with robust backend functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18, TypeScript, Vite, Wouter for routing, and TanStack Query for server state management. Styling is handled by Tailwind CSS, utilizing a custom design system and Shadcn UI (New York style variant) built on Radix UI primitives. Key design decisions include a modular component structure, React Query for server state, and a mobile-first responsive design with a pink/rose color palette for an elegant aesthetic.

### Backend Architecture

The backend uses Node.js with Express.js and TypeScript. MongoDB with Mongoose ODM serves as the data store. It features a RESTful API with JWT-based authentication using bcryptjs for password hashing. Key design decisions include MongoDB for its flexible schema, JWT for stateless authentication, and Mongoose schemas for core data models like Products, Users, Cart, Wishlist, Orders, and Addresses. The API supports comprehensive product filtering, sorting, and pagination. A dedicated WhatsApp service module handles OTP sending via WhatsApp Cloud API.

### Data Models

Core schemas include Product, User, Cart, Wishlist, Order, and Address. Products include comprehensive details and support color variants. Indexing strategy involves text indexes on product names/descriptions and a unique constraint on user email.

### Authentication & Authorization

JWT tokens are generated upon login/registration, stored in localStorage, and used for authorization via a Bearer token in API requests. Middleware validates tokens, and client-side routing protects authenticated routes. Passwords are hashed with bcryptjs.

### File Organization

The project is structured into `/client` (frontend), `/server` (backend), `/shared` (shared types), and `/attached_assets` (static assets). The build process uses Vite for the frontend and esbuild for the backend.

## External Dependencies

### Database

- **MongoDB:** Primary data store, accessed via `MONGODB_URI`. Mongoose handles connection pooling.

### UI Component Libraries

- **Radix UI:** Headless UI primitives.
- **Shadcn UI:** Pre-built components based on Radix UI.
- **Lucide React:** Icon library.

### Development Tools

- **Replit Plugins:** Development banner, cartographer, and runtime error overlay.

### Third-Party Services

- **WhatsApp Cloud API:** Used for sending OTPs for user authentication.

### Future Considerations (Not currently implemented)

- **Payment Processing:** Integration with gateways like Razorpay or Stripe.
- **Image Storage:** Cloud storage solutions such as S3 or Cloudinary.
- **Email Service:** For transactional emails (e.g., SendGrid, AWS SES).
- **Search:** Elasticsearch or Algolia for advanced search.
- **Analytics:** Google Analytics or Mixpanel.
- **CDN:** Cloudflare or AWS CloudFront for asset delivery.
- **Monitoring:** Sentry for error tracking.