import { Suspense } from 'react';
import HomePage from './HomePage';
import Loading from './loading';

export const revalidate = 10;

const imageFields = 'asset->{ _id, url, metadata }, crop, hotspot';

export default async function Home() {
  const { batchFetchSanityData } = await import('@/lib/sanity');

  const data = await batchFetchSanityData({
    homePageData: {
      query: `*[_type == "homePageSessions" && _id == "homePageSessions"][0] {
        ...,
        hero {
          ...,
          backgroundImage { ${imageFields} },
          featuredImage { ${imageFields} }
        },
        horizontalShowcase {
          ...,
          backgroundImage { ${imageFields} },
          image1 { ${imageFields} },
          image2 { ${imageFields} },
          image3 { ${imageFields} }
        },
        process {
          ...,
          backgroundImage { ${imageFields} },
          images[] { ${imageFields} }
        },
        services {
          ...,
          backgroundImage { ${imageFields} }
        },
        about {
          ...,
          backgroundImage { ${imageFields} },
          portraitImage { ${imageFields} }
        },
        contact {
          ...,
          backgroundImage { ${imageFields} }
        }
      }`,
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <HomePage homePageData={data.homePageData} />
    </Suspense>
  );
}
