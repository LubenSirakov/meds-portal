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

//ADD MED TO USER'S COLLECTION
export const addMeddToCollection = async ({ userId, medId, medsList, usersList }) => {

  try {
    //get user list of meds
    let snapshotUser = await get(child(dbRef, `userData/${userId}`));
    let snapshotMed = await get(child(dbRef, `userData/${medId}`))

    if (snapshotUser.exists()) {

      let userData = snapshotUser.val();

      medsList = userData.medsList;
      console.log(userData);
      update(ref(db, `userData/${userId}`), {
        medsList: [...medsList, medId]
      })



    } else {

      set(ref(db, `userData/${userId}`), {
        medsList: [...medsList, medId]
      })

    }

    if (snapshotMed.exists()) {

      let medData = snapshotMed.val();
      usersList = medData.usersList;

      update(ref(db, `userData/${medId}`), {
        usersList: [...usersList, userId]
      })

    } else {

      set(ref(db, `userData/${medId}`), {
        usersList: [...usersList, userId]
      })

    }
  } catch (error) {
    console.log(error);
  }
}

//GET USER'S MEDS
export const getUsersMeds = async (userId) => {
  try {
    let snapshot = await get(child(dbRef, `userData/${userId}/medsList`))

    if (snapshot.exists()) {

      let res = snapshot.val();

      return res;

    }
  } catch (error) {

    console.log(error);
  }
}