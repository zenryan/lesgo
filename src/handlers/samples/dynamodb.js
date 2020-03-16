/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'Middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import app from 'Config/app';
import User from 'Models/dynamodb/User';

connectSentry();

const originalHandler = async event => {
  // create new user, will overwrite if exist
  const user = new User(event.input);
  const createResult = await user.create();

  // update user.
  const object = { email: event.input.email, first_name: 'Changed name' };
  const updateResult = await user.update(object);

  // get updated user
  await user.find({ email: event.input.email });

  // create many user
  let params = [];
  for (let index = 0; index < 3; index += 1) {
    const newUser = {
      email: `email${index}@test.com`,
      first_name: `Name ${index}`,
      age: index,
    };
    params = [...params, newUser];
  }
  await user.createMany(params);

  const queried = await user.promisedExec(
    user.Model.query('email').eq('email1@test.com')
  );

  return [
    { create: { user: user.instance, result: createResult } },
    { update: { user: user.instance, result: updateResult } },
    { query: { users: queried } },
  ];
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
