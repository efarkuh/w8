import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";


export default async function SinglePostPage(params){ 
   
   
   async function handleAddComment(formData){
        "use server";
        const comment = formData.get("comment");
        const postid =  params.params.id;
        console.log(comment)
        await sql`
        INSERT INTO comments (Postid, Comment) VALUES (${postid}, ${comment})`;
        
        revalidatePath(`/posts/${params.params.id}`)
    }

    const post = await sql`
    SELECT * FROM posts WHERE id = ${params.params.id};
  `;
  
    const existComments = await sql`
    SELECT * FROM comments WHERE postid = ${params.params.id};
  `;

    return(
        <div>
            <h2>Individual {params.params.id}</h2>
            <p> {post.rows[0].content}</p>
            {/* colocar a categoria aqui tb */}

            <form action={handleAddComment}>
                <label htmlFor="name">Comment</label>
                <textarea name="comment" id="comment" />
                <button>Submit</button>
            </form>

            <h2>Comments</h2>
            <ul>
                {existComments.rows.map((existComments) => (
                <li key={existComments.id}>{existComments.comment}</li>
         ))}
       </ul>


        </div>
    );
}