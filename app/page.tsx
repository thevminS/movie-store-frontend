import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export default function Page() {
  const currentUser = cookies().get('user')?.value;
 
  if (!currentUser) {
    redirect('/auth/login')
  }else{
    redirect('/movies')
  }
 
  // Define other routes and logic
}