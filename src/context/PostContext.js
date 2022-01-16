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
    if (!postBody) throw { message:'Post body is required' };
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

// GET the user's personal feed
const getFeed = () => async () => {
    const { data: posts } = await froyoApi.get(`/feed`);
    return posts;
};

// Like a post (unlikes if already liked)
const likePost = () => async (postId) => {
    const { data: updatedPost } = await froyoApi.put(`/posts/${postId}/like`);
    return updatedPost;
};

// Dislike a post (undislikes if already disliked)
const dislikePost = () => async (postId) => {
    const { data: updatedPost } = await froyoApi.put(`/posts/${postId}/dislike`);
    return updatedPost;
};

export const { Provider, Context } = createDataContext(
    postReducer,
    {
        createPost,
        deletePost,
        getPost,
        searchPosts,
        getFeed,
        likePost,
        dislikePost
    }, {}
);
