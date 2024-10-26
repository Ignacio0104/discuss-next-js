import type { Comment} from "@prisma/client";
import { db } from "@/db";
import { cache } from "react";


export type CommentWithAuthor = (
  Comment &{
    user: {name: string | null, image: string | null},
  }
)

//Sort of memoization, will only call once with the same arguments
export const fetchCommentsByPostId = cache((postId:string): Promise<CommentWithAuthor[]> => {
  console.log("Making a query");
  return db.comment.findMany({
    where: { postId},
    include:{
      user: {select: {name: true, image: true}},
    }
  })
});