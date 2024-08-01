const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const app = express();
const pool = require('./db');
const port = process.env.PORT || 3001;

const next = require('next');
const { parse } = require('url');

const nextApp = next({ dev: true, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    // server setting
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../', 'public')));

    // express router setting
    app.use('/api', (req, res, next) => {
      res.send('api test');
    })

    app.get('/users', async (req, res) => {
      try {
        const [rows] = await pool.query(
          'SELECT user_no, login_id, name FROM tb_user'
        );
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // next.js routing
    app.get('/', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      nextApp.render(req, res, pathname, query);
    });
    app.get('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(`express server listening on port:${port}`);
      console.log(`http://localhost:${port}`);
    });
  })
.catch((e) => {
  console.error(e.stack);
  process.exit(1);
})

module.exports = app;