import { GET_USER_DATA } from '../actions';
import { user } from './index';

describe('user reducer', () => {
  it('should return the initial state', () => {
    const expectedInitialUserData = {
      city: 'San Francisco',
      email: 'joe.ekiert@gmail.com',
      name: 'Joe Ekiert',
      phone: '978.375.5916',
      state: null,
      street_address: null,
      website: 'http://ekiert.net',
      zip: null
    };

    expect(user(undefined, {})).toEqual(expectedInitialUserData);
  });

  it('should update user data when passed a response', () => {
    const expectedUserData = {
      city: 'Boston',
      email: 'joeekiert@gmail.com',
      name: 'Joe',
      phone: 'phone number',
      state: 'MA',
      street_address: '123 Anystreet',
      website: 'http://ekiert.net/joe-ekiert-resume.pdf',
      zip: 12345
    };

    expect(user(undefined, {
      type: GET_USER_DATA,
      data: expectedUserData
    })).toEqual(expectedUserData);
  });
});

import {
  GET_TECHNICAL_EXPERIENCES,
  PUT_TECHNICAL_EXPERIENCE,
  GET_WEAPONS_OF_CHOICE,
  PUT_WEAPON_OF_CHOICE,
  GET_EMPLOYMENT_EXPERIENCES,
  PUT_EMPLOYMENT_EXPERIENCE,
  POST_EMPLOYMENT_EXPERIENCE,
  DELETE_EMPLOYMENT_EXPERIENCE,
  GET_SCHOOLS,
  PUT_SCHOOL,
  GET_PROJECTS,
  PUT_PROJECT,
  POST_PROJECT,
  DELETE_PROJECT,
  GET_RESUME
} from '../actions';
import { resume } from './index';

describe('resume reducer', () => {
  it('should return the initial state', () => {
    const expectedInitialResumeState = {
      technicalExperiences: [],
      weaponsOfChoice: [],
      employmentExperiences: [],
      schools: [],
      projects: []
    };

    expect(resume(undefined, {})).toEqual(expectedInitialResumeState);
  });

  describe('GET_RESUME', () => {
    it('should return entire resume object', () => {
      const expectedResumeState = {
        technicalExperiences: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        weaponsOfChoice: ['why are you so violent, joe?'],
        employmentExperiences: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        schools: ['School 1'],
        projects: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ]
      };

      expect(resume(undefined, {
        type: GET_RESUME,
        data: expectedResumeState
      })).toEqual(expectedResumeState);

    });

    it('should correctly sort technical experiences', () => {
      const expectedResumeState = {
        technicalExperiences: [],
        weaponsOfChoice: [],
        employmentExperiences: [],
        schools: [],
        projects: []
      };

      const testArray = [
        {
          id: 3
        },
        {
          id: 1
        },
        {
          id: 2
        }
      ];

      expectedResumeState.technicalExperiences = testArray.slice();

      testArray.sort((a, b) => {
        return b.id - a.id
      });

      expect(resume(undefined, {
        type: GET_RESUME,
        data: expectedResumeState
      }).technicalExperiences).toEqual(testArray);
    });

    it('should correctly sort employment experiences', () => {
      const expectedResumeState = {
        technicalExperiences: [],
        weaponsOfChoice: [],
        employmentExperiences: [],
        schools: [],
        projects: []
      };

      const testArray = [
        {
          id: 3
        },
        {
          id: 1
        },
        {
          id: 2
        }
      ];

      expectedResumeState.employmentExperiences = testArray.slice();

      testArray.sort((a, b) => {
        return b.id - a.id
      });

      expect(resume(undefined, {
        type: GET_RESUME,
        data: expectedResumeState
      }).employmentExperiences).toEqual(testArray);
    });

    it('should correctly sort projects', () => {
      const expectedResumeState = {
        technicalExperiences: [],
        weaponsOfChoice: [],
        employmentExperiences: [],
        schools: [],
        projects: []
      };

      const testArray = [
        {
          id: 3
        },
        {
          id: 1
        },
        {
          id: 2
        }
      ];

      expectedResumeState.projects = testArray.slice();

      testArray.sort((a, b) => {
        return b.id - a.id
      });

      expect(resume(undefined, {
        type: GET_RESUME,
        data: expectedResumeState
      }).projects).toEqual(testArray);
    });

  });

  describe('TECHNICAL_EXPERIENCES', () => {
    describe('GET_TECHNICAL_EXPERIENCES', () => {
      it('should appropriately sort technical experiences', () => {
        const sortedArray = [
          {
            id: 3
          },
          {
            id: 1
          },
          {
            id: 2
          }
        ];
        const shuffledArray = sortedArray.slice();
        sortedArray.sort((a, b) => {
          return b.id - a.id
        });

        expect(resume(undefined, {
          type: GET_TECHNICAL_EXPERIENCES,
          data: shuffledArray
        }).technicalExperiences).toEqual(sortedArray);

      });
    });

    describe('PUT_TECHNICAL_EXPERIENCE', () => {
      it('should not update any experiences if id does not match', () => {
        const expectedExperiences = [
          {
            id: 1,
            name: 'name1'
          }
        ];

        const mockResumeState = {
          technicalExperiences: expectedExperiences,
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: []
        };

        const updateObject = {
          id: 2,
          name: 'name2'
        };

        expect(resume(mockResumeState, {
          type: PUT_TECHNICAL_EXPERIENCE,
          data: updateObject
        }).technicalExperiences).toEqual(expectedExperiences);

      });

      it('should update experience if id does match', () => {
        const existingExperiences = [
          {
            id: 1,
            name: 'name1'
          }
        ];

        const mockResumeState = {
          technicalExperiences: existingExperiences,
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: []
        };

        const updateObject = {
          id: 1,
          name: 'hello there'
        };

        expect(resume(mockResumeState, {
          type: PUT_TECHNICAL_EXPERIENCE,
          data: updateObject
        }).technicalExperiences).toEqual([updateObject]);

      });
    });
  });

  describe('WEAPONS_OF_CHOICE', () => {
    describe('GET_WEAPONS_OF_CHOICE', () => {
      it('should return weapons of choice', () => {
        const testArray = ['foo', 'bar'];

        expect(resume(undefined, {
          type: GET_WEAPONS_OF_CHOICE,
          data: testArray
        }).weaponsOfChoice).toEqual(testArray);

      });
    });

    describe('PUT_WEAPON_OF_CHOICE', () => {

      it('should not update weepon if id does not match', () => {
        const expectedWeepons = [
          {
            id: 1,
            name: 'blah'
          },
          {
            id: 2,
            name: 'bleh'
          }
        ];

        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: expectedWeepons,
          employmentExperiences: [],
          schools: [],
          projects: []
        };

        const updateObject = {
          id: 3,
          name: 'howdy howdy'
        };

        expect(resume(mockResumeState, {
          type: PUT_WEAPON_OF_CHOICE,
          data: updateObject
        }).weaponsOfChoice).toEqual(expectedWeepons);

      });

      it('should update weepon if id does match', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [
            {
              id: 1,
              name: 'this gets updated'
            }
          ],
          employmentExperiences: [],
          schools: [],
          projects: []
        };

        const updateObject = {
          id: 1,
          name: 'pb4ugo2bed'
        };

        expect(resume(mockResumeState, {
          type: PUT_WEAPON_OF_CHOICE,
          data: updateObject
        }).weaponsOfChoice).toEqual([updateObject]);

      });

    });
  });

  describe('GET_EMPLOYMENT_EXPERIENCES', () => {
    it('should appropriately sort employment experiences', () => {
      const sortedArray = [
        {
          id: 3
        },
        {
          id: 1
        },
        {
          id: 2
        }
      ];
      const shuffledArray = sortedArray.slice();
      sortedArray.sort((a, b) => {
        return b.id - a.id
      });

      expect(resume(undefined, {
        type: GET_EMPLOYMENT_EXPERIENCES,
        data: shuffledArray
      }).employmentExperiences).toEqual(sortedArray);

    });
  });

  describe('SCHOOLS', () => {
    describe('GET_SCHOOLS', () => {
      it('should return schools', () => {
        const testArray = ['bar', 'foo'];

        expect(resume(undefined, {
          type: GET_SCHOOLS,
          data: testArray
        }).schools).toEqual(testArray);

      });
    });

    describe('PUT_SCHOOL', () => {
      it('should not update if id does not match', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [
            {
              id: 1,
              name: 'name1'
            },
            {
              id: 2,
              name: 'name2'
            },
            {
              id: 3,
              name: 'name3'
            }
          ],
          projects: []
        };

        const schoolWithWrongId = {
          id: 4,
          name: 'you should never see this'
        };

        expect(resume(mockResumeState, {
          type: PUT_SCHOOL,
          data: schoolWithWrongId
        })).toEqual(mockResumeState);

      });

      it('should update if id does match', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [
            {
              id: 1,
              name: 'name1'
            }
          ],
          projects: []
        };

        const updateData = {
          id: 1,
          name: 'Awesome Name'
        };

        expect(resume(mockResumeState, {
          type: PUT_SCHOOL,
          data: updateData
        }).schools[0]).toEqual(updateData);
      });
    });

  });

  describe('PROJECTS', () => {
    describe('GET_PROJECTS', () => {
      it('should return projects', () => {
        const testArray = ['meep', 'mee', 'me'];

        expect(resume(undefined, {
          type: GET_PROJECTS,
          data: testArray
        }).projects).toEqual(testArray);
      });
    });

    describe('PUT_PROJECT', () => {
      it('should not update if id does not match', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: [
            {
              id: 1,
              name: 'name1'
            },
            {
              id: 2,
              name: 'name2'
            },
            {
              id: 3,
              name: 'name3'
            }
          ]
        };

        const projectWithWrongId = {
          id: 4,
          name: 'you should never see this'
        };

        expect(resume(mockResumeState, {
          type: PUT_PROJECT,
          data: projectWithWrongId
        })).toEqual(mockResumeState);

      });

      it('should update if id does match', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: [
            {
              id: 1,
              name: 'name1'
            }
          ]
        };

        const updateData = {
          id: 1,
          name: 'Awesome Name'
        };

        expect(resume(mockResumeState, {
          type: PUT_PROJECT,
          data: updateData
        }).projects[0]).toEqual(updateData);
      });

    });

    describe('POST_PROJECT', () => {
      it('should update the projects array with new object', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: [
            {
              id: 1,
              name: 'name1'
            }
          ]
        };

        const postObject = {
          id: 2,
          name: 'name2'
        };

        expect(resume(mockResumeState, {
          type: POST_PROJECT,
          data: postObject
        }).projects.length).toEqual(2);

      });
    });

    describe('DELETE_PROJECT', () => {
      it('should not remove any projects if id does not match', () => {
        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: [
            {
              id: 1
            }
          ]
        };

        const deleteObject = {
          id: 2
        };

        expect(resume(mockResumeState, {
          type: DELETE_PROJECT,
          data: deleteObject
        }).projects).toEqual(mockResumeState.projects);

      });

      it('should remove project when id matches', () => {
        const projects = [
          {
            id: 1,
          },
          {
            id: 2
          }
        ]

        const mockResumeState = {
          technicalExperiences: [],
          weaponsOfChoice: [],
          employmentExperiences: [],
          schools: [],
          projects: projects
        };

        const deleteObject = {
          id: 2
        };

        const expectedResult = projects.filter(p => p.id !== deleteObject.id);

        expect(resume(mockResumeState, {
          type: DELETE_PROJECT,
          data: deleteObject
        }).projects).toEqual(expectedResult);

      });
    });

  });

});