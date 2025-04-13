import { Task } from "../entity/Task";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";


@Resolver()
export class TaskResolver{
    @Query(()=>String)
    async hello(){
        return "hello world";
    }

    @Query(()=>[Task],{nullable:true})
    async getTasks():Promise<Task[] |null>{
        return await Task.find();
    }

    @Query(()=>Task,{nullable:true})
     getsingletask(
        @Arg("id",()=>Int) id:number
    ): Promise<Task | null>{
        const task= Task.findOne({where:{id}});
        return task;
    }

    @Mutation(()=>Task)
    async createTask(
        @Arg("title",()=>String) title:string
    ):Promise<Task>{
      const task=await Task.create({title,isComplete:false}).save()
      return task;
    }

    @Mutation(()=>Boolean)
    async deleteTask(
        @Arg("id",()=>Int) id:number
    ):Promise<boolean>{
        try{
            const task=await Task.delete({id});
            if (task.affected && task.affected > 0) {
                return true; 
              } else {
                return false; 
              }
        }catch (error) {
            console.error("Error deleting task:", error);
            return false;
          }
    }


    @Mutation(()=>Task,{nullable:true})
    async editTask(
        @Arg("id",()=>Int) id:number ,
        @Arg("isComplete",()=>Boolean) isComplete:boolean,
        @Arg("title",()=>String) title:string
    ):Promise<Task | null>{
        const task=await Task.findOne({where:{id}})
        if(!task){
            return null;
        }
        try{
            await Task.update({ id }, { isComplete, title });
            const editedTask = await Task.findOne({ where: { id } });
            return editedTask;
        }catch{
            return null;
        }
    }
}


