import { Pool } from 'pg';

const pool = new Pool({
  user: 'simulation_api',
  host: 'localhost',
  database: 'simulation_db',
  password: 'byd64', //store password in env file or environment variable for actual deployment
  port: 5432,
});

export { pool };