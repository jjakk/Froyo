import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';

// Handle setting state
const postReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

// POST a post
const createPost = (dispatch) => async (info, callback) => {
    try{
        const { postBody } = info;
        const response = await froyoApi.post('/posts', { text: postBody });
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
        return post;
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
}

// GET all the posts of a given user
const getUserPosts = (dispatch) => async () => {
    try{
        const { data: posts } = await froyoApi.get('/posts');
        let completePosts = [];
        for(let i = 0; i < posts.length; i++){
            const {
                data: {
                    first_name,
                    last_name
                }
            } = await froyoApi.get(`/users/${posts[i].author_id}`);
            completePosts.push({
                ...posts[i],
                authorName: (first_name + ' ' + last_name)
            });
        }
        return completePosts;
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Like a post (unlikes if already liked)
const likePost = (dispatch) => async ({ id }) => {
    try{
        await froyoApi.put(`/posts/${id}/like`);
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err.message}` })
    }
};

// Dislike a post (undislikes if already disliked)
const dislikePost = (dispatch) => async ({ id }) => {
    try{
        await froyoApi.put(`/posts/${id}/dislike`);
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err.message}` })
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
