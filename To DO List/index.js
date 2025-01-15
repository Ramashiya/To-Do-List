const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(task => ({
    text: task.firstChild.textContent,
    completed: task.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTaskToDOM = (taskText, completed = false) => {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('completed');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
};

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task.');
  addTaskToDOM(taskText);
  saveTasks();
  taskInput.value = '';
});

loadTasks();
