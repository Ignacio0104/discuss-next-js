'use server'

import { z } from "zod";
import {auth} from "@/auth"
import { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-]+$/, { message: "Must be lowercase letters or dashes"}),
  description: z.string().min(10)
})

interface CreateTopicFormState {
  errors:{
    name?: string[],
    description?: string[];
    _form?: string[];
  }
}
export async function createTopic(formState:CreateTopicFormState, formData : FormData): Promise<CreateTopicFormState> {

  const name = formData.get("name");
  const description = formData.get("description");

  const result = createTopicSchema.safeParse({
    name,
    description
  })

  const session = await auth();

  if(!session || !session.user){
    return {
      errors:{
        _form: ["You must be signed in"]
      }
    }
  }

  if(!result.success){
    return{
      errors: result.error.flatten().fieldErrors,
    }
  }

  let topic : Topic;
  try {
    topic = await db.topic.create({
      data:{
        slug: result.data.name,
        description: result.data.description
      }
    })
  } catch (error) {
    if(error instanceof Error){
      return{
        errors:{
          _form: [error.message],
        }
      }
    }else{
      return{
        errors:{
          _form: ["Something went wrong"]
        }
      }
    }
  }

  revalidatePath('/')

  redirect(paths.topicShow(topic.slug))
 
}