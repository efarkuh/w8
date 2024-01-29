import { sql } from "@vercel/postgres";
import Link from 'next/link';

export default async function PostListPage(){ 
    const posts = await sql`
          SELECT * FROM posts;
        `;
        return (
            <div>
              <h1>Posts</h1>
              <ul>
                {posts.rows.map((post) => (
                 <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                    {post.title}
                    </Link>
                 </li>
                ))}
              </ul>
            </div>
          );
        }    
    
    // return(
    //     <div>
    //         <h1>Posts</h1>
    //         <div className="posts"> 
    //             {posts.rows.map((post) => {
    //                 return(
    //                     <div key={post.title} className="tit">
    //                         <h3>{post.title}</h3>
    //                         {/* <p>{post.content}</p> */}
    //                         {/* colocar a categoria aqui tb */}
    //                 )};
    //             }
            // </div>
            // <h2>Individual {params.id}</h2>
    //   <ul>
    //     {posts.rows.map((post) => (
    //       <li key={post.id}>{post.title}</li>
    //     ))}
    //   </ul>
//         </div>
//     );
// }