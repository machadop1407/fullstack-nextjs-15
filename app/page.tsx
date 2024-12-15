import { Post } from "@prisma/client";
import Link from "next/link";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Simple Social Network</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link href={`/posts/${post.id}`}>View Post</Link>
        </div>
      ))}
    </div>
  );
}
