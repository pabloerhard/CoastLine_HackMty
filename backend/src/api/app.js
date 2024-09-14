import { addUser, getUsers, getUser, updateUser, deleteUser } from './main.js';

// Example usage of Firestore functions

async function run() {
  // Add a new user
  const idUser = await addUser({
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });

  // Get all users
  const users = await getUsers();
  console.log("Users: ", users);

  // Get a specific user by document ID
  const user = await getUser(idUser);
  console.log("Single user: ", user);

  // Update a user
  await updateUser(idUser, { last: "Byron" });

  // Delete a user
//   await deleteUser(idUser);
}

run();
