// -- TODO: Add RETURNING to your Sql queries
// -- TODO: Add limits to select all queries

import { Pool } from 'pg';
import debug from 'debug';

export default class Model {
  constructor(table) {
    this.table = table;
    Model.logger(`Table connected ${table}`);

    this.pool = new Pool();

    this.pool.on('error', (error) => {
      Model.logger('Unexpected error on idle client', error);
      process.exit(-1);
    });
  }

  static logger(message) {
    debug('dev:model')(message);
  }

  static async create(property) {
    const model = {
      ...property,
      id: randomNumber(options),
      created_on: moment(),
    };
    properties.push(model);
    return model;
  }

  async select(columns, clause = '') {
    const query = `SELECT ${columns} FROM ${this.table} ${clause};`;
    Model.logger(`Our query is ${query}`);
    const data = await this.pool.query(query);
    return data.rows;
  }

  async insert(columns, values, queryData) {
    const query = `INSERT INTO ${this.table}(${columns}) VALUES ${values} RETURNING ${queryData};`;
    Model.logger(`Our query is ${query}`);
    const data = await this.pool.query(query);
    return data.rows;
  }

  async update(columns, values, queryData, clause = '') {
    const query = `UPDATE SET ${this.table}(${columns}) WHERE ${clause} RETURNING ${queryData};`;
    Model.logger(`Our query is ${query}`);
    const data = await this.pool.query(query);
    return data.rows;
  }

  async delete(clause) {
    const query = `DELETE FROM ${this.table} WHERE ${clause} RETURNING index;`;
    Model.logger(`Our query is ${query}`);
    const data = await this.pool.query(query);
    return data.rows;
  }
}
// (async(){
// debug('dev:test')(await new Model(table: "properties").select(columns: "id")
// debug('dev:test')(await new Model(table: "properties").insert(columns: "name")
// })
