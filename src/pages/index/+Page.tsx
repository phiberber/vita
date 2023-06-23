import { Counter } from './Counter'

function Page() {

  return (
    <div class='p-4 space-y-2'>
      <h1>Welcome</h1>
      <p>This page is:</p>
      <p>Rendered to HTML.</p>
        <p>Interactive.</p>
        <Counter className='w-full' />
    </div>
  )
}

export default Page
