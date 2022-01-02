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
const createPost = () => async (info) => {
    const { postBody } = info;
    await froyoApi.post('/posts', { text: postBody });
};

// DELETE a post by id
const deletePost = () => async (postId) => {
    await froyoApi.delete(`/posts/${postId}`);
}

// GET a post by id
const getPost = () => async (postId) => {
    const {
        data: post
    } = await froyoApi.get(`/posts/${postId}`);
    return post;
}

// (GET) Search posts
const searchPosts = () => async (query) => {
    const { data: posts } = await froyoApi.get('/posts', {
        params: query
    });
    return posts;
}

// Like a post (unlikes if already liked)
const likePost = () => async (postId) => {
    await froyoApi.put(`/posts/${postId}/like`);
};

// Dislike a post (undislikes if already disliked)
const dislikePost = () => async (postId) => {
    await froyoApi.put(`/posts/${postId}/dislike`);
};

export const { Provider, Context } = createDataContext(
    postReducer,
    {
        getPost,
        createPost,
        deletePost,
        searchPosts,
        likePost,
        dislikePost
    }, {}
);
