import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';

// Handle setting state
const postReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'load_post':
            return { ...state, post: action.payload, errorMessage: '' }
        case 'load_posts':
            return { ...state, posts: action.payload, errorMessage: '' }
        default:
            return state;
    }
};

// POST a post
const createPost = (dispatch) => async (info, callback) => {
    try{
        const { postBody } = info;
        const response = await froyoApi.post('/posts', { body: postBody });
        callback();
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(message);
    }
};

// DELETE a post by id
const deletePost = (dispatch) => async (postId, callback) => {
    try{
        await froyoApi.delete(`/posts/${postId}`);
        callback(true);
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Unable to delete post` })
        callback(false);
    }
}

// GET a post by id
// Use callback if you don't want to change state
const getPost = (dispatch) => async (postId, callback) => {
    try{
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
        // Don't change state if callback is passed
        if(callback){
            callback(post);
        }
        else{
            dispatch({ type: 'load_post', payload: post });
        }
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
}

// GET all the posts of a given user
const getUserPosts = (dispatch) => async () => {
    try{
        const response = await froyoApi.get('/posts');
        dispatch({ type: 'load_posts', payload: response.data });
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Like a post (unlikes if already liked)
const likePost = (dispatch) => async (postId) => {
    try{
        await froyoApi.put(`/posts/${postId}/like`);
    }
    catch(err){
        console.log(err);
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Dislike a post (undislikes if already disliked)
const dislikePost = (dispatch) => async (postId) => {
    try{
        await froyoApi.put(`/posts/${postId}/dislike`);
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
    postReducer,
    {
        getPost,
        createPost,
        deletePost,
        getUserPosts,
        likePost,
        dislikePost,
        clearErrorMessage
    },
    {
        post: {},
        errorMessage: '',
        posts: []
    }
);
