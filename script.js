// Work Flow

//1. Fetch user from API

//2. Store those users in global array

//3. Display users in the UI

let userList = [];

const displayElm = document.getElementById('list');

const apiEP = 'https://randomuser.me/api?';

const countElm = document.getElementById('count');

const fetchUsers = async (path = 'results=20') => {
  // using promise

  //   fetch(apiEP)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       userList = data.results;
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  try {
    const response = await fetch(apiEP + path);
    const data = await response.json();
    userList = data.results;
    // console.log(userList);
    displayUser(userList);
  } catch (error) {
    console.log(error);
  }
};

fetchUsers();

const displayUser = (displayArg) => {
  let str = '';

  displayArg.forEach((user) => {
    str += `<div class="card" style="width: 18rem;">
<img class="card-img-top" src="${user?.picture?.large}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${user?.name?.title} ${user?.name?.first} ${user?.name?.last}</h5>
  
 
 <div class="card-text"><span><i class="fa-solid fa-envelope"></i> ${user?.email}</span></div>
 <div class="card-text"><span><i class="fa-solid fa-house"></i> ${user?.location?.street?.number} ${user?.location?.street?.name}, ${user?.location?.city}, ${user?.location?.country} </span></div>
<a href="tel:${user?.phone}"><div class="d-grid">
<button class="btn btn-primary d-grid"><span><i class="fa-solid fa-phone"></i> ${user?.phone}</span></button></div></a>
 

</div>
</div>`;
  });
  displayElm.innerHTML = str;
  countElm.innerText = displayArg.length;
};

document.getElementById('select').addEventListener('change', (e) => {
  const { value } = e.target;

  const path = `results=20&gender=` + value;
  fetchUsers(path);
});

document.getElementById('search-input').addEventListener('keyup', (e) => {
  const { value } = e.target;
  console.log(value);

  // run filter method

  const filteredUser = userList.filter((item) => {
    const fullName = (item.name.first + ' ' + item.name.last).toLowerCase();
    return fullName.includes(value.toLowerCase());
  });

  // display function

  displayUser(filteredUser);
});
