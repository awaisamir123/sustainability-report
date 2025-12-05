## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

The project requires a PostgreSQL database. You have two options:

#### Option A: Use a Local PostgreSQL Database

1. Make sure PostgreSQL is installed on your system
2. Create a new database:
   ```bash
   createdb db
   ```
3. Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/yout_DB
   JWT_SECRET=your_random_string

   # Generate migrations (if needed)
npx drizzle-kit generate
npm run db:push