import { Context } from "src/types/Context";
import { Task } from "../entity/Task";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { requireAuth } from "../utils/auth";


@Resolver()
export class TaskResolver{
    @Query(()=>String)
    async hello(){
        return "hello world";
    }

    @Query(()=>[Task],{nullable:true})
    async getTasks(@Ctx() ctx:Context):Promise<Task[] |null>{
        await requireAuth(ctx);
        return await Task.find();
    }

    @Query(()=>Task,{nullable:true})
     async getsingletask(
        @Arg("id",()=>Int) id:number,
        @Ctx() ctx:Context
    ): Promise<Task | null>{
        await requireAuth(ctx);
        return Task.findOne({where:{id}});
        
    }

    @Mutation(()=>Task)
    async createTask(
        @Arg("title",()=>String) title:string,
        @Arg("priority",()=>String) priority:string,
        @Ctx() ctx:Context
    ):Promise<Task>{
      await requireAuth(ctx);
      const task=await Task.create({title,priority,isComplete:false}).save()
      return task;
    }

    @Mutation(()=>Boolean)
    async deleteTask(
        @Arg("id",()=>Int) id:number,
        @Ctx() ctx:Context
    ):Promise<boolean>{
        await requireAuth(ctx);
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
        @Arg("title",()=>String) title:string,
        @Arg("priority",()=>String ,{nullable:true}) priority:string,
        @Ctx() ctx:Context
    ):Promise<Task | null>{
        await requireAuth(ctx);
        const task=await Task.findOne({where:{id}})
        if(!task){
            return null;
        }
        try{
            const updateData:any={isComplete,title};
            if (priority !== undefined) updateData.priority = priority;
            await Task.update({ id }, updateData);
            return Task.findOne({ where: { id } });
        }catch{
            return null;
        }
    }
}


