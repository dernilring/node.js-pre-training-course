import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  Delete,
  Inject,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";



@Controller("todos")
export class TodoController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly todoService: TodoService
  ) {}

     @Get('test-ttl')
  async demonstrateTTL() {
    const testKey = 'test:ttl:demo';
    
    await this.cacheManager.set(testKey, 'test value', 10000);
    console.log('Data cached with 10s TTL at', new Date().toLocaleTimeString());
    
    setTimeout(async () => {
      const cached = await this.cacheManager.get(testKey);
      console.log('After 5s:', cached ? 'FOUND' : 'NOT FOUND');
    }, 5000);
    
    setTimeout(async () => {
      const cached = await this.cacheManager.get(testKey);
      console.log('After 11s:', cached ? 'FOUND' : 'NOT FOUND (expired)');
    }, 11000);
    
    return { 
      message: 'TTL test started. Check console logs after 5s and 11s',
      ttl: '10 seconds'
    };
  }

  @Get()
  async getAll() {
    const todos = await this.todoService.getAll();
    if (!todos) {
      throw new NotFoundException("todos not found");
    }
    return todos;
  }
  @Get(":id")
  async getById(@Param("id") id: string) {
    const todos = await this.todoService.getById(Number(id));
    if (!todos) {
      throw new NotFoundException(`todos with id ${id} not found`);
    }
    return todos;
  }
  @Get("user/:user_id/todos")
  async getByID(@Param("user_id") user_id: string) {
    const cacheKey = `todos:user:${user_id}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      console.log("caches hit for user ", user_id);
      return { source: "cache", data: cached };
    }
    console.log("cache miss for user", user_id);
    const todos = await this.todoService.getByUserId(Number(user_id));

    await this.cacheManager.set(cacheKey, todos, 300000);
    return { source: "database", data: todos };
  }

  @Post()
  async create(
    @Body()
    body: {
      title: string;
      description?: string;
      completed?: boolean;
      user_id?: number;
    }
  ) {
    const result = await this.todoService.create(body);
    if (body.user_id) {
      await this.cacheManager.del(`todos:user:${body.user_id}`);
      console.log("cache invalidated for user", body.user_id);
    }
    return result;
  }
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body()
    body: {
      title?: string;
      completed?: boolean;
      description?: string;
      user_id?: number;
    }
  ) {
    const todo = await this.todoService.getById(Number(id));
    const result = await this.todoService.update(Number(id), body);

    if (todo?.user_id) {
      await this.cacheManager.del(`todos:user:${body.user_id}`);
      console.log("cache invalidated for user", body.user_id);
    }
    return result;
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const todo = await this.todoService.getById(Number(id));

    const result = await this.todoService.delete(Number(id));
    if (todo?.user_id) {
      await this.cacheManager.del(`todos:user:${todo.user_id}`);
      console.log("cache invalidated for user", todo.user_id);
    }
    return result;
  }

 
}
