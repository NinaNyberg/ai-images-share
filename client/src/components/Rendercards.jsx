import { Card } from '../components';

const RenderCards = ({ data, title, fetchPosts }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card key={post._id} {...post} fetchPosts={fetchPosts} />
    ));
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] tets-xl uppercase">{title}</h2>
  );
};

export default RenderCards;
