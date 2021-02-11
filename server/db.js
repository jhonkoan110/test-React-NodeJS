import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'i7i5h0w742979psx',
    host: 'localhost',
    port: 5432,
    database: 'qpd_node_project',
});

module.exports = pool;
