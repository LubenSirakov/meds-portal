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
export const edit = ({ name, description, count, imgUrl, owner, medId }) => {
  try {
    update(ref(db, `meds/${medId}`), {
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
}

//DELETE MED
export const deleteMed = (medId) => {
  try {
    remove(child(dbRef, `meds/${medId}`), null);
  } catch (error) {
    console.log(error);
  }
}