const mybatisMapper = require('mybatis-mapper');
const path = require('path');

const format = { language: 'sql', indent: '  ' };

function getQuery(mapper, namespace, id, params = {}){
  mybatisMapper.createMapper([path.join(__dirname, './' + mapper + '.xml')]);
  return mybatisMapper.getStatement(namespace, id, params, format);
}

module.exports = { getQuery };
