
# AttendanceSystem

Simple attendance and proof-submission web application (frontend + Node.js backend).

## Project Structure

- `AttendanceSystem/` — main project folder
	- `Backend/` — Node.js/Express backend
		- `server.js` — application entry
		- `Config/` — database config and SQL schema (`db.js`, `schema.sql`)
		- `Controllers/`, `Models/`, `Routes/`, `Middlewares/` — server logic
		- `uploads/` — stored uploaded files
	- `public/` — static assets for frontend
	- `src/` — React + Vite frontend
		- `components/`, `pages/`, `services/` — UI and API client

## Features

- User authentication (JWT)
- Admin routes for management and analytics
- File uploads (proof submissions)
- Student analytics and dashboards

## Prerequisites

- Node.js 16+ and npm
- A MySQL (or compatible) database for persistence

## Environment Variables

Create a `.env` file in `AttendanceSystem/Backend/` with values similar to:

- `DB_HOST` — database host
- `DB_USER` — database user
- `DB_PASSWORD` — database password
- `DB_NAME` — database name
- `PORT` — backend port (default: 5000)
- `JWT_SECRET` — secret for signing JWTs

Check `AttendanceSystem/Backend/Config/db.js` for how DB configuration is loaded.

## Setup & Run

1. Install frontend dependencies and start dev server

```bash
cd AttendanceSystem
npm install
npm run dev
```

2. Install backend dependencies and start server

```bash
cd AttendanceSystem/Backend
npm install
# start backend (use the script in package.json or run node directly)
node server.js
# or
npm start
```

3. Database

- Run the SQL in `AttendanceSystem/Backend/Config/schema.sql` to create tables.

## Notes for Development

- API routes are defined under `AttendanceSystem/Backend/Routes/`.
- Controllers and models live in `Controllers/` and `Models/` respectively.
- File uploads are handled by middleware in `AttendanceSystem/Backend/Middlewares/uploads.js` and saved to `uploads/`.

## Useful Paths

- Frontend entry: `AttendanceSystem/src/main.jsx`
- Navbar component: `AttendanceSystem/src/components/Navbar.jsx`
- Backend entry: `AttendanceSystem/Backend/server.js`

## Testing & Linting

- Run frontend/backend tests (if present) using their respective npm scripts.
- Linting: see `eslint.config.js` at the project root.

## Troubleshooting

- If the frontend cannot reach the backend, confirm `PORT` and any proxy settings in the Vite config.
- Check database credentials and ensure the DB server is reachable.

## License

This project does not include a license file. Add one if you plan to open-source it.

---
Generated README for developer convenience. Update sections to match exact scripts and env vars in your `package.json` and config files.
