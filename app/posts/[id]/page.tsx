import { Post, Comment } from "@prisma/client";

async function getPost(
  postId: string
): Promise<Post & { comments: Comment[] }> {
  const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <p key={comment.id}>{comment.content}</p>
        ))}
      </div>
    </div>
  );
}
