import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';

// Handle setting state
const commentReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

// POST a comment
const createComment = () => async (info) => {
    const { text } = info;
    console.log(text);
    if (!text) throw { message:'Comment body is required' };
    await froyoApi.post('/comments', info);
};

// DELETE a comment
const deleteComment = () => async (commentId) => {
    await froyoApi.delete(`/comments/${commentId}`);
}

// GET a comment
const getComment = () => async (commentId) => {
    const { data: comment } = await froyoApi.get(`/comments/${commentId}`);
    return comment;
}

// GET all the comments of a given parent
const getComments = () => async (parentId) => {
    const { data: comments } = await froyoApi.get(`/posts/${parentId}/comments`);
    return comments;
};

// Like a comment (unlikes if already liked)
const likeComment = () => async (commentId) => {
    await froyoApi.put(`/comments/${commentId}/like`);
};

// Dislike a comment (undislikes if already disliked)
const dislikeComment = () => async (commentId) => {
    await froyoApi.put(`/comments/${commentId}/dislike`);
};

export const { Provider, Context } = createDataContext(
    commentReducer,
    {
        getComment,
        createComment,
        deleteComment,
        getComments,
        likeComment,
        dislikeComment,
    }, {}
);
