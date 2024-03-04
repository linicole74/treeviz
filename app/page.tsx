import { Metadata } from 'next'
import HomePage from './home-page'
 
export const metadata: Metadata = {
  title: 'My Page Title',
}
 
export default async function Page() {
  return (
    <div>
      <HomePage/>
    </div>
  );
}