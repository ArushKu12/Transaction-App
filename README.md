# Paytm Wallet Clone

A Paytm-like wallet application built using **Next.js** with an auxiliary backend, designed to facilitate peer-to-peer transactions. Users can create accounts, send, and receive money seamlessly.

## 🚀 Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js (Hono)
- **Database:** Prisma
- **Authentication:** OAuth
- **Monorepo Management:** Turborepo

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <project-directory>
   
2. **Install Neccessary Dependencies**
   ```sh
   npm i

3. **Configure Database Credentials**
   ```sh
   cd ./packages
   cd ./db
   npx prisma generate
   npx prisma seed

  4.**Run the Project**
    ```sh
    cd ../..
    npm run dev
    
