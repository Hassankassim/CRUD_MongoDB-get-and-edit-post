import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';




const getTopics = async () => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000'; // Fallback to localhost if API_URL is not set

  try {
    const res = await fetch(`${apiUrl}/api/topics`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading topics: ', error);
    return { topics: [] }; // Return an empty array in case of error
  }
};

export default async function TopicsList() {
  try {
    const { topics } = await getTopics();

    return (
      <>
   
        {topics.map((t) => (
          <div
            key={t._id}
            className="p-1 border border-slate-600 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>
            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))}
      </>
    );
  } catch (error) {
    console.error('Error in TopicsList:', error);
    return <div>Error loading topics. Please try again later.</div>;
  }
}