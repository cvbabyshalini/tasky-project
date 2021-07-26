// Parent element to store cards
const taskContainer = document.querySelector(".task__container");


//Global Store
let globalStore = [];


const newCard = ({
  id,
  imageUrl,
  taskTitle,
  taskType,
  taskDescription,
}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2 ">
    <button type="button" id=${id} class="btn btn-outline-success onclick = "editCard.apply(this,arguments)">
      <i class="fas fa-pencil-alt id=${id} onclick = "editCard.apply(this,arguments)"></i>
    </button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick = "deleteCard.apply(this,arguments)">
      <i id=${id} class="fas fa-trash-alt" onclick = "deleteCard.apply(this,arguments)"></i>
    </button>
  </div>
  <img
    src=${imageUrl}
    class="card-img-top" 
    alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">
    ${taskDescription}
    </p>
    <span class="badge bg-primary">${taskType}</span></h5>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>`;

const loadInitialTaskCards = () => {
  //access localstorage
  const getInitialData = localStorage.getItem("tasky");
 if(!getInitialData) return;
  //convert stringified-object to object
  const { cards } = JSON.parse(getInitialData);

  //map around the array to generate HTML card and inject it to DOM 
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(card);
  })
};

const updateLocalStorage = () => {
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //unique number for card id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };
  //html code
  const createNewCard = newCard(taskData);


  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(taskData);

  //Application programming interface
  updateLocalStorage();
};

const deleteCard = (event) => {
   //id
   event = window.event;
   const targetID = event.target.id;
   const tagname = event.target.tagName;
   //search the globalStore, remove the object which matches with the id
   globalStore = globalStore.filter(
     (cardObject) => cardObject.id !== targetID
   );
   updateLocalStorage();
   //access dom to remove them

   if(tagname == "BUTTON"){
     return taskContainer.removeChild(
     event.target.parentNode.parentNode.parentNode //col-lg-4
     );
   }
   return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
    );



};

const editCard = (event) => {
    console.log("hey card");
};

//Issues

// The modal was not closing upon adding new card. - solved
// the cards were deleted after refresh -> localstorage (5MB) - solved

//features
//delete modal feature
//open task
//edit task
//hint 1.contenteditable 2.setAttributeNode()
