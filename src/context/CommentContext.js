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
const getComment = (dispatch) => async (postId, callback=(() => {})) => {
    /*try{
        const response = await froyoApi.get(`/posts/${postId}`);
        // Get author name & add it to the post
        // This is necessary because the author value given is equal to a database id
        const {
            data: {
                firstName,
                lastName
            }
        } = await froyoApi.get(`/users/${response.data.author}`);
        const post = {
            ...response.data,
            authorName: (firstName + ' ' + lastName)
        };
        dispatch({ type: 'load_post', payload: post });
        callback(post);
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }*/
}

// GET all the comments of a given parent
const getComments = (dispatch) => async ({ comments }) => {
    try{
        let result = [];
        for(let i = 0; i < comments.length; i++){
            const { data } = await froyoApi.get(`/comments/${comments[i]}`);
            result.push(data);
        }

        dispatch({ type: 'load_comments', payload: result });
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Like a comment (unlikes if already liked)
const likeComment = (dispatch) => async (postId) => {
    /*try{
        await froyoApi.put(`/posts/${postId}/like`);
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }*/
};

// Dislike a comment (undislikes if already disliked)
const dislikeComment = (dispatch) => async (postId) => {
    /*try{
        await froyoApi.put(`/posts/${postId}/dislike`);
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    };*/
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
