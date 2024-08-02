const express = require('express');
const pool = require('../db'); // MySQL 연결 설정 파일
const { getQuery, mybatisQueryExcute } = require('../mapper/index');
const router = express.Router();

router.get('/users/:login_id', async (req, res) => {
  try {
    const result = await mybatisQueryExcute('usersMapper', 'getUserInfo', req.params);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const [user] = await mybatisQueryExcute('usersMapper', 'getUser', req.body);
    if ( req.body.password !== user.password ) {
      return res.status(500).json({
        message: '패스워드 틀림',
        extensions: {
          code: 2440000,
          data: [],
        },
      });
    } else {
      return res.status(500).json({
        message: '성공',
        extensions: {
          code: 2000000,
          data: user,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
