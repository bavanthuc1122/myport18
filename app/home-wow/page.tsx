import { Suspense } from 'react';
import Loading from '../loading';

export const revalidate = 10; // Revalidate every 10 seconds

export default async function HomeWow() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Home Wow Demo</h1>
        <p className="text-xl mb-4">This is a demo page for the Wow animations.</p>
        <p className="text-xl mb-4">Please visit the main page to see the actual website.</p>
        <a href="/" className="text-blue-500 hover:underline">Go to Home Page</a>
      </div>
    </Suspense>
  );
}
