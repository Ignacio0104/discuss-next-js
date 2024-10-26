import type { Post } from "@prisma/client";
import { db } from "@/db";


export type PostWithData = (
  Post &{
    topic: { slug: string},
    user: {name: string | null},
    _count: {comments:number}
  }
)

//Shortcut to create interface
//export type PostWithData = Awaited<ReturnType<typeof fetchPostByTopicSlug>>[number];

export function fetchPostByTopicSlug(slug:string): Promise<PostWithData[]>{
  return db.post.findMany({
    where: { topic: {slug}},
    include:{
      topic: { select: {slug:true}},
      user: {select: {name: true}},
      _count: {select: {comments:true}}
    }
  })
}


export function fetchTopPosts(): Promise<PostWithData[]>{
  return db.post.findMany({
    orderBy: [
      {
        comments:{
          _count: "desc"
        }
      }
    ],
    include:{
      topic: { select: {slug:true}},
      user: {select: {name: true, image: true}},
      _count: {select: {comments:true}}
    },
    take: 5,
  })
}


export function fetchPostBySearchTerm(term:string): Promise<PostWithData[]>{
  return db.post.findMany({
    where:{
      OR:[
        {
          title: {contains: term}
        },
        {
          content: {contains: term}
        }
      ]
    },
    include:{
      topic: { select: {slug:true}},
      user: {select: {name: true, image: true}},
      _count: {select: {comments:true}}
    },
  })
}