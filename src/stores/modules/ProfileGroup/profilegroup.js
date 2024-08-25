import CustomizedAxios from "../../../plugins/axios";
const profilegroupsModule = {
  state: {

  },
  mutations: {

  },
  actions: {


    setProfileGroupByType({ commit, state }, type) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroups/getByType", type)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {


  },
};

export default profilegroupsModule;
