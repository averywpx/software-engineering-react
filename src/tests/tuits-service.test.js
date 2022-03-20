import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";
import {
  createTuit,
  findTuitById, findAllTuits,
  deleteTuit
} from "../services/tuits-service"
import 'regenerator-runtime/runtime'

describe('createTuit', () => {
    // sample user to insert
    const ripley = {
      username: 'test',
      password: 'lv426',
      email: 'ellenripley@aliens.com'
    };

    const testTuit = {
      tuit: "alice's tuit"
    }
  
    // setup test before running test
    beforeAll(() => {
      // remove any/all users to make sure we create it in the test
      return deleteUsersByUsername(ripley.username);
    })
  
    // clean up after test runs
    afterAll(() => {
      // remove any data we created
      return deleteUsersByUsername(ripley.username);
    })
  
    test('can create tuit with REST API', async () => {
      // insert new user in the database
      const newUser = await createUser(ripley);
      const newTuit = await createTuit(newUser._id, testTuit)
  
      // verify inserted tuit's properties match parameter user
      expect(newTuit.tuit).toEqual(testTuit.tuit);
      deleteTuit(newTuit._id)
    });
});

describe('deleteTuit', () => {
  // sample user to insert
  const ripley = {
    username: 'test',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const testTuit = {
    tuit: "alice's tuit"
  }

  // setup before running test
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(ripley.username)
  });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    return deleteUsersByUsername(ripley.username);
  });

  test('can delete tuit wtih REST API', async () => {
    // insert new user in the database
    const newUser = await createUser(ripley);
    const newTuit = await createTuit(newUser._id, testTuit)

    // delete a user by their username. Assumes user already exists
    const status = await deleteTuit(newTuit._id);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('findTuitById', () => {
  // sample user to insert
  const ripley = {
    username: 'test',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const testTuit = {
    tuit: "alice's tuit"
  }

  // setup before running test
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(ripley.username)
  });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    return deleteUsersByUsername(ripley.username);
  });

  test('can retrieve a tuit by their primary key with REST API', async () => {
    // insert the user in the database
    const newUser = await createUser(ripley);
    const newTuit = await createTuit(newUser._id, testTuit)

    // verify new user matches the parameter user
    expect(newTuit.tuit).toEqual(testTuit.tuit);

    // retrieve the user from the database by its primary key
    const existingTuit = await findTuitById(newTuit._id);

    // verify retrieved user matches parameter user
    expect(existingTuit.tuit).toEqual(testTuit.tuit);

    deleteTuit(newTuit._id)
  });

});

describe('findAllTuits', () => {
  // sample user to insert
  const ripley = {
    username: 'test',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const tuitInfos = ['tuit 1', 'tuit 2', 'tuit 3']
  

  // setup before running test
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(ripley.username)
  });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    return deleteUsersByUsername(ripley.username);
  });

  test('can retrieve all tuits with REST API', async () => {
    // insert the user in the database
    const newUser = await createUser(ripley);
    var newTuitIds = []

    tuitInfos.map(tuitInfo =>
      {
        const newTuit = createTuit(newUser._id,
          {
          tuit: tuitInfo
        })
        newTuitIds.push(newTuit._id)
      }
    )

    const tuits = await findAllTuits();

    expect(tuits.length).toBeGreaterThanOrEqual(tuitInfos.length);
    const tuitsWeInserted = tuits.filter(
      tuit => tuitInfos.indexOf(tuit.tuit) >= 0);

      tuitsWeInserted.forEach(tuit => {
      const tuitInfo = tuitInfos.find(tuitInfo => tuitInfo === tuit.tuit);
      expect(tuit.tuit).toEqual(tuitInfo);
      
    });

    newTuitIds.map(newTuitId =>
      deleteTuit(newTuitId)
    )

    
  });
});