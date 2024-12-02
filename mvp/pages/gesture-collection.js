import Head from 'next/head';

export default function GestureCollection() {
  return (
    <div>
      <Head>
        <title>Gesture Collection</title>
      </Head>
      <iframe
        src="/gesture-collection.html" // Path to the HTML file
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
        title="Gesture Collection App"
      ></iframe>
    </div>
  );
}
