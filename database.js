/* eslint-disable max-len */
const { Sequelize, DataTypes, Op  } = require('sequelize');

class Product {
  constructor() {
    this.sequelize = new Sequelize({
        database: 'testdb',
        username: 'postgres',
        password: '12345',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        logging: false,
    });

    this.table = this.sequelize.define('products', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.table.findAll()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  add(data) {
    return new Promise((resolve, reject) => {
      this.table.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

}

module.exports = new Product();