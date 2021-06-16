async function blogCommentHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('input[name="comment-body"]').value.trim();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log( `\nPOST comment for blog# [${post_id}]\n` );

  if (comment_text) {
    console.log( `ADDing COMMENT: [${JSON.stringify(post_id,blog_comment)}]` );
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        blog_comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log( "Reloading..." );
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector('#comment-form').style.display = "block";
    }
  }
}

// document.querySelector('#addBlogComment').addEventListener('click', blogCommentHandler);
document.querySelector('#save-comment-btn').addEventListener('submit', blogCommentHandler);
