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
const createComment = () => async (info, callback) => {
    try {
        const {
            text,
            parent_id
        } = info;
        if(!text || !parent_id){
            const message = !text ? 'Empty comment' : (!parent_id ? 'No parent' : null);
            return callback(message);
        }
        await froyoApi.post('/comments', info);
        callback();
    }
    catch (err) {
        callback(err.response.data);
    }
};

// DELETE a comment
const deleteComment = () => async (commentId, callback) => {
    try{
        await froyoApi.delete(`/comments/${commentId}`);
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
}

// GET a comment
const getComment = () => async (commentId, callback) => {
    try{
        const response = await froyoApi.get(`/comments/${commentId}`);
        // Get author name & add it to the post
        // This is necessary because the author value given is equal to a database id
        const {
            data: {
                firstName,
                lastName
            }
        } = await froyoApi.get(`/users/${response.data.author_id}`);
        const comment = {
            ...response.data,
            authorName: (firstName + ' ' + lastName)
        };
        callback(comment);
    }
    catch(err){
        callback(null, err.response.data);
    }
}

// GET all the comments of a given parent
const getComments = () => async ({ id: parentId }, callback) => {
    try{
        const { data: comments } = await froyoApi.get(`/posts/${parentId}/comments`);
        callback(comments);
    }
    catch(err){
        callback([], err.response.data);
    }
};

// Like a comment (unlikes if already liked)
const likeComment = () => async (commentId, callback) => {
    try{
        await froyoApi.put(`/comments/${commentId}/like`);
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
};

// Dislike a comment (undislikes if already disliked)
const dislikeComment = () => async (commentId, callback) => {
    try{
        await froyoApi.put(`/comments/${commentId}/dislike`);
        callback();
    }
    catch(err){
        callback(err.response.data);
    };
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
