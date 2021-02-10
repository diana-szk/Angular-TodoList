import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { importType } from '@angular/compiler/src/output/output_ast';
import {Todo} from '../models/Todo'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos'
  todosLimit = '?_limit=5'

  constructor(private http:HttpClient) { }

  //Get Todos
  getTodos():Observable<Todo[]> {
   return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  //Delete from server
  deleteTodo(todo: Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions)
  }

  //Add Todo

  addTodo(todo: Todo): Observable <Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions)
  }

  //Toggle completed
  toggleCompleted(todo: Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions);
  }
}
