import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class Board implements OnInit {
  tasks: Task[] = [];
  stagesNames: string[] = [];
  stagesTasks: any[] = []; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'Task 1', stage: 0 },
      { name: 'Task 2', stage: 0 }
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function first verifies the input and then add a task to the list
  addTask(input: string, st: number){
    if(this.validateInput(input)){
      var newTask = {name: input, stage: st}
      this.tasks.push(newTask);
      this.configureTasksForRendering();
    }
  }

  // this function verifies the input
  validateInput(input: string){
    // if input is empty, return false
    if(input == "")return false;
    // if input is already in the task list, return false
    var x = this.tasks.find(element => element.name == input);
    if(x != null) return false;
    // if input is not empty and repeated, return true
    return true;
  }
  
  // Delete a task from the list
  onDelete(task: any){
    this.tasks = this.tasks.filter(x => x.name != task.name);
    this.configureTasksForRendering();
  }

  // Move a task to a previous stage
  onBack(task: any){
    if(task.stage != 0){
      this.onDelete(task);
      task.stage--;
      this.addTask(task.name, task.stage);
    }
  }

 // Move a task to the next stage
  onForward(task: any){
    if(task.stage != 3){
      this.onDelete(task);
      task.stage++;
      this.addTask(task.name, task.stage);
    }
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name:any) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}