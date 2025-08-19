export const UnionResolvers = {
  userResult: {
    __resolveType(obj) {
      if (obj.id && obj.name && obj.email) {
        return "User";   
      }
      if (obj.message) {
        return "Error"; 
      }
      return null;
    },
  },

  getAllUserResult: {
    __resolveType(obj) {
      if (obj.getAllUsers) {
        return "getAllUsersWrapper";
      }
      if (obj.message) {
        return "Error";            
      }
      return null;
    },
  },
};
