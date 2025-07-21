import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput{
    @Field()
    email:string;

    @Field()
    password:string;

    @Field()
    username:string;
}

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}