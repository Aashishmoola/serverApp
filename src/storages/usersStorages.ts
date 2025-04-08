export { usersStorage };

type userType = {
  id: number;
  firstName: string;
  lastName: string;
};

type userNamePropType = {
  firstName: string;
  lastName: string;
};

const usersStorage = (function UsersStorage() {
  // All of these are private variables, so using IIFE for UsersStorage in order for there to be only one working instance
  const storage: Record<number, userType> = {};
  let id: number = 0;

  function addUser({ firstName, lastName }: userNamePropType) {
    storage[id] = { id, firstName, lastName };
    // return current value then increment
    return id++;
  }

  function getUsers() {
    return Object.values(storage);
  }

  function getUser(id: number) {
    return storage[id];
  }

  function updateUser(id: number, { firstName, lastName }: userNamePropType) {
    storage[id] = { id, firstName, lastName };
  }

  function deleteUser(id: number) {
    delete storage[id];
  }

  return { addUser, getUsers, getUser, updateUser, deleteUser };
})();
