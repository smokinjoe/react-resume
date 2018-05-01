// __mocks__/joeGet.js
// Mocking the joeGet() method located in actions/index.js
const resume = {
  technicalExperiences: [],
  weaponsOfChoice: [],
  employmentExperiences: [],
  schools: [],
  projects: []
};

export default function joeGet(options) {
  return new Promise((resolve, reject) => {
    // const userID = parseInt(url.substr('/resume/'.length), 10);
    process.nextTick(
      () =>
        // users[userID]
        //   ? resolve(users[userID])
        //   : reject({
        //       error: 'User with ' + userID + ' not found.',
        //     });
        resolve(resume)
    );
  });
}