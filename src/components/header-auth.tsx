'use-client';
import * as action from "@/actions"
import { auth } from "@/auth";
import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"

export default async function HeaderAuth(){
  const session = await auth();

  let authContent: React.ReactNode;
  
  if(session?.user){
    authContent = 
    <Popover placement="left" >
      <PopoverTrigger>
        <Avatar src={session.user.image || ''}/>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <form action={action.signOut}>
            <Button type="submit">Sign out</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  }else{
    authContent = <>
    <NavbarItem>
      <form action={action.signIn}>
        <Button type="submit" color="secondary" variant="bordered">Sign In</Button>
      </form>
    </NavbarItem>
    <NavbarItem>
      <form action={action.signIn}>
      <Button type="submit" color="primary" variant="flat">Sign Up</Button>
      </form>
    </NavbarItem>
    </>  
  }

  return authContent

}