import { getDatabase, ref, child, get, set, onValue, DataSnapshot } from 'firebase/database';

const db = getDatabase();
const dbRef = ref(getDatabase());

const baseUrl = 'https://meds-portal-69e7a-default-rtdb.europe-west1.firebasedatabase.app/';

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
// export const getOne = (id) => fetch(`${baseUrl}/meds/${id}.json`).then(res => res.json());
export const getOne = async (medId) => {
  try {
    let snapshot = await get(child(dbRef, `meds/${medId}`))
    if (snapshot.exists()) {
      let res = snapshot.val();
      console.log(res);
      return res;
    } else {
      console.log('No data avaliable');

    }
  } catch (error) {
    console.log(error);

  }
}

//CREATE NEW MED
export const create = ({ name, description, imgUrl, owner, medId }) => {
  set(ref(db, 'meds/' + medId), {
    name,
    description,
    imgUrl,
    owner,
    medId
  });
};

// export const create = async (medData) => {
//   let response = await fetch(`${baseUrl}/meds.json`, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({ ...medData })
//   });

//   let result = await response.json();

//   return result;
// }
