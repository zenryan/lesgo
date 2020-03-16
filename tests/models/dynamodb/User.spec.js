import dynamodb from 'Utils/dynamodb';
import User from 'Models/dynamodb/User';
import BaseModel from 'Services/dynamodb/BaseModel';

jest.mock('Services/dynamodb/BaseModel');

describe('test Dynamodb Db User table', () => {
  it('test User property', async () => {
    const { Schema } = dynamodb();
    expect(User.table).toBe('users');
    expect(User.schema).toBeInstanceOf(Schema);

    // eslint-disable-next-line no-unused-vars
    const user = new User();
    expect(BaseModel).toHaveBeenCalledTimes(1);
  });
});
