import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';

// Handle setting state
const commentReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'load_comment':
            return { ...state, comment: action.payload, errorMessage: '' }
        case 'load_comments':
            return { ...state, comments: action.payload, errorMessage: '' }
        default:
            return state;
    }
};

// POST a comment
const createComment = (dispatch) => async (info, callback) => {
    try{
        const {
            body,
            parent
        } = info;
        if(!body || !parent){
            const message = !body ? 'Empty comment' : (!parent ? 'No parent' : null);
            dispatch({ type: 'add_error', payload: message });
            return callback(message);
        }
        const response = await froyoApi.post('/comments', info);
        return callback();
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        return callback(err);
    }
};

// DELETE a comment
const deleteComment = (dispatch) => async (postId, callback) => {
    /*try{
        await froyoApi.delete(`/posts/${postId}`);
        callback(true);
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Unable to delete post` })
        callback(false);
    }*/
}

// GET a comment
const getComment = (dispatch) => async (commentId, callback=(() => {})) => {
    try{
        const response = await froyoApi.get(`/comments/${commentId}`);
        // Get author name & add it to the post
        // This is necessary because the author value given is equal to a database id
        const {
            data: {
                firstName,
                lastName
            }
        } = await froyoApi.get(`/users/${response.data.author}`);
        const comment = {
            ...response.data,
            authorName: (firstName + ' ' + lastName)
        };
        // Don't change state if callback is passed
        if(callback){
            callback(comment);
        }
        else{
            dispatch({ type: 'load_comment', payload: comment });
        }
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
}

// GET all the comments of a given parent
const getComments = (dispatch) => async ({ id: parentId }, callback) => {
    try{
        console.log(parentId);
        const { data: comments } = await froyoApi.get(`/posts/${parentId}/comments`);
        if(callback) callback(comments);
        else dispatch({ type: 'load_comments', payload: comments });
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Like a comment (unlikes if already liked)
const likeComment = (dispatch) => async (commentId) => {
    try{
        await froyoApi.put(`/comments/${commentId}/like`);
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Dislike a comment (undislikes if already disliked)
const dislikeComment = (dispatch) => async (commentId) => {
    try{
        await froyoApi.put(`/comments/${commentId}/dislike`);
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    };
};

// Clear the error message
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'add_error', payload: '' });
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
        clearErrorMessage
    },
    {
        comment: {},
        errorMessage: '',
        comments: null
    }
);
