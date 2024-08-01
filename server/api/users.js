const express = require('express');
const pool = require('../db'); // MySQL 연결 설정 파일
const { getQuery } = require('../mapper/index');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const query = getQuery('users_mapper','usersMapper', 'getUsers');
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
