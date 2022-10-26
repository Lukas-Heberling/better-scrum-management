import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>better scrum - Login</title>
        <meta name="description" content="better scrum login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        Just a placeholder but you can
        {' '}
        <Link href="/betterScrum">Login!</Link>
      </h1>
    </div>
  )
}
