const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '../.env.prod') });
} else {
    dotenv.config({ path: path.join(__dirname, '../.env.dev') });
}

const sequelize = new Sequelize(
    process.env.AWS_RDS_DATABASE,
    process.env.AWS_RDS_USER,
    process.env.AWS_RDS_PASSWORD,
    {
        host: process.env.AWS_RDS_HOST,
        dialect: 'mysql',
        timezone: '+09:00', //한국 시간 셋팅
        operatorsAliases: Sequelize.Op,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        logging: false, //콘솔
    },
);

let db = [];

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.js') && file !== 'index.js';
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
