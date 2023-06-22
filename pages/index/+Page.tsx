import { Counter } from './Counter'

function Page() {
  return (
    <>
      <h1>Welcome</h1>
      <p>This page is:</p>
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}

export default Page
