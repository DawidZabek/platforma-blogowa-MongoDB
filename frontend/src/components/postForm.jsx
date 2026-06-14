import { useState } from 'react';
import { createPost } from '../api/postsApi';

function PostForm({ onPostCreated }) {


  return (
    <form onSubmit={handleSubmit}>
      <h2>Utwórz owy post</h2>

      <textarea
        placeholder="Tekst posta"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        placeholder="tagi, oddzielone, przecinkiem"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <input
        placeholder="Twoje ID"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
      />

      <button type="submit">Dodaj</button>
    </form>
  );
}

export default PostForm;