# YumDrop - Enterprise Food Delivery & Logistics Microservices Platform

[![Build & Test](https://github.com/B-Bhanu123/yumdrop-/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/B-Bhanu123/yumdrop-/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Microservices Count](https://img.shields.io/badge/Microservices-7%20Services-blue.svg)](#microservices-architecture)
[![Codebase Size](https://img.shields.io/badge/LOC-50%2C000%2B-green.svg)](#codebase-metrics)

**YumDrop** is a production-grade, highly scalable, event-driven food delivery and logistics microservices platform engineered for high availability, fault tolerance, and low latency.

---

## 🏗️ Architecture Overview

The system comprises 7 independent microservices, a shared core domain package, automated test suites, and enterprise DevOps manifests.

```
                                  +------------------------------+
                                  |    API Gateway (Port 3000)   |
                                  +--------------+---------------+
                                                 |
         +-----------------------+---------------+-----------------------+-----------------------+
         |                       |               |                       |                       |
  +------v-------+        +------v-------+ +-----v--------+       +------v-------+        +------v-------+
  | User & Auth  |        | Restaurant & | |   Order &    |       |   Payment    |        | Notification |
  |   Service    |        | Catalog Svc  | | Dispatch Svc |       | & Billing Svc|        |  & Event Svc |
  | (Port 3001)  |        | (Port 3002)  | | (Port 3003)  |       | (Port 3004)  |        | (Port 3005)  |
  +--------------+        +--------------+ +--------------+       +--------------+        +--------------+
         |                       |               |                       |                       |
  +------v-------+        +------v-------+ +-----v--------+       +------v-------+        +------v-------+
  | PostgreSQL / |        | MongoDB /    | | PostgreSQL / |       | PostgreSQL / |        | Redis /      |
  | Redis Auth   |        | Geo-spatial  | | Redis State  |       | Ledger DB    |        | Message Bus  |
  +--------------+        +--------------+ +--------------+       +--------------+        +--------------+
```

### Microservices Ecosystem

1. **API Gateway (`/services/api-gateway`)** - Central router, JWT authorization, rate limiting, request validation, circuit breaker proxying, Swagger docs.
2. **User & Auth Service (`/services/user-auth-service`)** - Customer, driver, restaurant owner, & admin identity management, OAuth2/OIDC, JWT tokens, RBAC.
3. **Restaurant Catalog Service (`/services/restaurant-catalog-service`)** - Restaurant profiles, menus, dish variants, dietary tags, availability, geo-location search.
4. **Order & Dispatch Service (`/services/order-dispatch-service`)** - Shopping cart, order state machine, driver assignment matching, real-time tracking, Saga orchestrator.
5. **Payment & Billing Service (`/services/payment-billing-service`)** - Payment gateways (Stripe/PayPal mock adapters), transaction ledgers, driver payouts, invoicing.
6. **Notification & Event Service (`/services/notification-service`)** - Real-time WebSockets, push notifications, email/SMS rendering, event queue consumers.
7. **Kitchen Analytics & AI Service (`/services/analytics-service`)** - Real-time metrics streaming, demand forecasting, cuisine trends, CSV/PDF report generators.
8. **Shared Core Library (`/packages/shared-core`)** - Shared DTOs, domain event schemas, standard logger, security & encryption utilities, custom error types.

---

## 🧪 Testing & Verification

- **Unit Tests**: Minimum 5+ comprehensive test cases per service (>35 test files total).
- **Integration & E2E Tests**: Full checkout flow verification from user registration to delivery notification.
- **LOC Verification**: Run `node scripts/verify-loc-count.js` to dynamically verify total codebase lines (>50,000 LOC).

---

## 🚀 Quick Start (Local Development)

```bash
# Clone repository
git clone https://github.com/B-Bhanu123/yumdrop-.git
cd yumdrop-

# Install root & workspace dependencies
npm install

# Launch microservices cluster via Docker Compose
docker-compose -f deploy/docker-compose.yml up --build
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
