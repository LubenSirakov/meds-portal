const baseUrl = 'https://meds-portal-69e7a-default-rtdb.europe-west1.firebasedatabase.app/';

// export const getAll = async () => {
//   let response = await fetch(`${baseUrl}/meds.json`);

//   let meds = await response.json();
//   console.log(meds);
//   let result = Object.values(meds);

//   return result;
// };

export function getAll() {
  fetch('https://meds-portal-69e7a-default-rtdb.europe-west1.firebasedatabase.app/meds.json')
    .then(res => res.json())
    .then(res => {
      res = Object.values(res);
      console.log(res);
    })
  } 


export const create = async (medData) => {
    let response = await fetch(`${baseUrl}/meds.json`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...medData })
    });

    let result = await response.json();

    return result;
  }
