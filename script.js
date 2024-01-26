const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a dispensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];

function createTaskItem(task, index) {
  const listItem = document.createElement('li');
  const taskContainer = document.createElement('div');
  const taskTypeSpan = document.createElement('span');
  const taskTitle = document.createElement('p');
  const removeButton = document.createElement('button');

  listItem.id = `task_${index}`;

  listItem.classList.add('task__item');
  taskContainer.classList.add('task-info__container');
  taskTypeSpan.classList.add('task-type');
  removeButton.classList.add('task__button--remove-task');

  taskTitle.textContent = task.title;

  const taskClasses = ['span-normal', 'span-important', 'span-urgent'];

  const taskHasClass = taskClasses.some(cls => taskTypeSpan.classList.contains(cls));

  if (!taskHasClass) {
    const typeLowerCase = task.type.toLowerCase();
    if (typeLowerCase === 'urgente') {
      taskTypeSpan.classList.add('span-urgent');
    } else if (typeLowerCase === 'importante') {
      taskTypeSpan.classList.add('span-important');
    } else {
      taskTypeSpan.classList.add('span-normal');
    }
  }

  taskContainer.appendChild(taskTypeSpan);
  taskContainer.appendChild(taskTitle);
  listItem.appendChild(taskContainer);
  listItem.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
    const taskIndex = tasks.findIndex(t => t.title === task.title && t.type === task.type);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      renderElements(tasks);
    }
  });

  return listItem;
}

function renderElements(tasks) {
  const taskList = document.querySelector('.tasks__list');

  if (!taskList) {
    console.error("Elemento <ul> não encontrado.");
    return;
  }

  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index);
    taskList.appendChild(taskItem);
});
}

renderElements(tasks);

const addButton = document.querySelector('.form__button--add-task');

addButton.addEventListener('click', () => {
  const titleInput = document.getElementById('input_title');
  const typeInput = document.querySelector('.form__input--priority');

  const title = titleInput.value;
  const selectedIndex = typeInput.selectedIndex;
  const type = typeInput.options[selectedIndex].value.toLowerCase();

  if (title.trim() === '' || type.trim() === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const newTask = {
    title: title,
    type: type
  };

  tasks.push(newTask);

  renderElements(tasks);

  titleInput.value = '';
  typeInput.value = '';
  
  const newTaskIndex = tasks.length - 1;
  const newTaskItem = document.getElementById(`task_${newTaskIndex}`);
  const newTaskTypeSpan = newTaskItem.querySelector('.task-type');

  console.log("Novo elemento de tarefa criado:", newTaskItem);
  console.log("Span interno da nova tarefa:", newTaskTypeSpan);
  console.log("Classes atuais do span interno:", newTaskTypeSpan.classList);

  if (type === 'urgente') {
    console.log("Tipo de tarefa: Urgente");
  } else if (type === 'importante') {
      console.log("Tipo de tarefa: Importante");
  } else {
      console.log("Tipo de tarefa: Normal");
  }
});
