const mybatisMapper = require('mybatis-mapper');
const path = require('path');
const pool = require('../db')

mybatisMapper.createMapper(
  [path.join(__dirname, './' + 'users_mapper.xml')]
);

function getQuery(namespace, id, params){
  return mybatisMapper.getStatement(namespace, id, params, { language: 'sql', indent: '  ' });
}

async function mybatisQueryExcute(namespace, id, params) {
  const query = getQuery(namespace, id, params);
  const [result] = await pool.query(query);
  return result;
}

module.exports = { mybatisQueryExcute };
