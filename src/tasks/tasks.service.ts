import { Injectable } from '@nestjs/common';
import { createTask, Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): any {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    console.log(tasks, 'tasks');
    if (status) {
      tasks = tasks.filter((task: any) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.includes(search)
        ) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item: any) => item.id === id);
  }

  removeTask(id: string): any {
    this.tasks = this.tasks.filter((item: any) => item.id !== id);
    return this.tasks;
  }

  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: any): any {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
