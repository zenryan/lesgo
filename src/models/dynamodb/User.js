/* eslint-disable class-methods-use-this */
import dynamodb from 'Utils/dynamodb';
import BaseModel from 'Services/dynamodb/BaseModel';

const { Schema } = dynamodb();
const table = 'users';
const schema = new Schema(
  {
    email: { type: String, hashKey: true },
    age: { type: Number },
    first_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

class User extends BaseModel {
  constructor(object = {}, options = {}) {
    super(table, schema, object, options);
  }
}

User.table = table;
User.schema = schema;

export default User;
