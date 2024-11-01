import { db } from '@/db'
import paths from '@/path';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react'

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderTopics = topics.map((topic)=>{
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color='warning' variant='shadow'>{topic.slug}</Chip>
        </Link>
      </div>
    )
  })

  return (
    <div className='flex flex-row gap-2 flex-wrap'>
      {renderTopics}
    </div>
  )
}
