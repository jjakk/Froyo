import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';

// Handle setting state
const postReducer = (state, action) => {
    switch(action.type){
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
const deletePost = () => async (postId, callback) => {
    try{
        await froyoApi.delete(`/posts/${postId}`);
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
}

// GET a post by id
// Use callback if you don't want to change state
const getPost = () => async (postId, callback) => {
    try{
        const {
            data: unformattedPost
        } = await froyoApi.get(`/posts/${postId}`);
        // Get author name & add it to the post
        // This is necessary because the author value given is equal to a database id
        const {
            data: {
                first_name,
                last_name
            }
        } = await froyoApi.get(`/users/${unformattedPost.author_id}`);
        const post = {
            ...unformattedPost,
            authorName: (first_name + ' ' + last_name)
        };
        callback(post);
    }
    catch(err){
        callback(null, err.response.data);
    }
}

// GET all the posts of a given user
const getUserPosts = () => async (callback) => {
    try {
        const { data: unformattedPosts } = await froyoApi.get('/posts');
        let posts = [];
        for(let i = 0; i < unformattedPosts.length; i++){
            const {
                data: {
                    first_name,
                    last_name
                }
            } = await froyoApi.get(`/users/${unformattedPosts[i].author_id}`);
            posts.push({
                ...unformattedPosts[i],
                authorName: (first_name + ' ' + last_name)
            });
        }
        callback(posts);
    }
    catch(err){
        callback([], err.response.data);
    }
};

// Like a post (unlikes if already liked)
const likePost = () => async ({ id }, callback) => {
    try{
        await froyoApi.put(`/posts/${id}/like`);
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
};

// Dislike a post (undislikes if already disliked)
const dislikePost = () => async ({ id }, callback) => {
    try{
        await froyoApi.put(`/posts/${id}/dislike`);
        callback();
    }
    catch(err){
        callback(err.response.data);
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
    }, {}
);
