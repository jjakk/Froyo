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
        callback(true);
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(false);
    }
};

// DELETE a post
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

// GET a post
const getPost = (dispatch) => async (postId) => {
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
        dispatch({ type: 'load_post', payload: post });
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

export const { Provider, Context } = createDataContext(
    postReducer,
    {
        getPost,
        createPost,
        deletePost,
        getUserPosts
    },
    {
        post: {},
        errorMessage: '',
        posts: []
    }
);
