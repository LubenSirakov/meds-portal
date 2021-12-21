import { getDatabase, ref, child, get, set, onValue, DataSnapshot, limitToFirst, remove, update } from 'firebase/database';

const db = getDatabase();
const dbRef = ref(getDatabase());

//GET ALL MEDS
export const getAll = async () => {
  try {
    let snapshot = await get(child(dbRef, 'meds'))
    if (snapshot.exists()) {
      let res = snapshot.val();
      res = Object.values(res);
      return res;
    } else {
      console.log('No data avaliable');
    }

  } catch (error) {
    console.log(error);
  }

}

//GET LAST THREE


//GET ONE MED
export const getOne = async (medId) => {
  try {
    let snapshot = await get(child(dbRef, `meds/${medId}`))
    if (snapshot.exists()) {
      let res = snapshot.val();
      // console.log(res);
      return res;
    } else {
      console.log('No data avaliable');

    }
  } catch (error) {
    console.log(error);

  }
}

//CREATE NEW MED
export const create = ({ name, description, count, imgUrl, owner, medId }) => {
  try {
    set(ref(db, 'meds/' + medId), {
      name,
      description,
      count,
      imgUrl,
      owner,
      medId
    });
  } catch (error) {
    console.log(error);
  }
};

//EDIT MED
export const edit = ({ name, description, count, imgUrl, owner, medId, lists }) => {
  try {
    update(ref(db, `meds/${medId}`), {
      name,
      description,
      count,
      imgUrl,
      owner,
      medId,
      lists
    });
  } catch (error) {
    console.log(error);
  }
}

//DELETE MED
export const deleteMed = (medId) => {
  try {
    remove(child(dbRef, `meds/${medId}`), null);
  } catch (error) {
    console.log(error);
  }
}

//ADD USER INFO
// export const createUser = ({ email, description, profilePic, age, userMeds }) => {
//   try {
//     set(ref(db, 'userData/'), {
//       email,
//       description,
//       profilePic,
//       age,
//       userMeds
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

//ADD MED TO USER'S COLLECTION
export const addMeddToCollection = async ({ userId, userMeds, medId }) => {
  let userCollection = [];
  let lists = [];

  try {
    //get user list of meds
    let snapshotUser = await get(child(dbRef, `userData/${userId}/${userMeds}`));
    let snapshotMed = await get(child(dbRef, `meds/${medId}`));

    if (snapshotUser.exists()) {

      let userData = snapshotUser.val();
      let medData = snapshotMed.val();
      userCollection = userData.userMeds;
      lists = medData.lists;

      console.log(lists);

      console.log(userCollection);

      update(ref(db, 'userData/' + userId), {
        userId,
        userMeds: [...userCollection, medId],
      })

      update(ref(dbRef, `meds/${medId}` + lists), {
        lists: [...lists, userId]
      })



    } else {

      set(ref(db, 'userData/' + userId), {
        userId,
        userMeds: [...userCollection, medId],
      })


      set(ref(dbRef, `meds/${medId}` + lists), {
        lists: [...lists, userId]
      })

    }
  } catch (error) {
    console.log(error);
  }
}

//GET USER'S MEDS
export const getUsersMeds = async (userId) => {
  try {
    let snapshot = await get(child(dbRef, `userData/${userId}/userMeds`))
    if (snapshot.exists()) {
      let res = snapshot.val();
      // console.log(userId);
      // console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}