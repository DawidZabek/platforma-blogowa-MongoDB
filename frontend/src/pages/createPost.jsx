import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postsApi";

import { useNewPostData } from "../hooks/useNewPostData";

function CreatePost() {
    const navigate = useNavigate();

    const {
        content,
        setContent,
        tags,
        setTags,
        authorId,
        setAuthorId,
        error,
        saving,
        handleSubmit
    } = useNewPostData();

      return (
        <main className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Dodaj nowy post</h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Tekst posta:
                                    </label>
                                    <textarea className="form-control" rows="5" placeholder="Wpisz swoją treść posta"
                                        value={content} onChange={(e) => setContent(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Tagi
                                    </label>
                                    <input className="form-control" type="text" placeholder="tagi, rozdzielone, przecinkiem"
                                        value={tags} onChange={(e) => setTags(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        ID autora
                                    </label>
                                    <input
                                        className="form-control" type="text" placeholder="Podaj swoje ID"
                                        value={authorId}onChange={(e) => setAuthorId(e.target.value)}/>
                                </div>

                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary" type="submit"
                                        disabled={saving} onClick={() => navigate("/")}>
                                        {saving ? "Tworzenie posta..." : "Dodaj post"}
                                        
                                    </button>

                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/")}>
                                        Anuluj
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CreatePost;