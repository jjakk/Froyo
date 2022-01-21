import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';

// Handle setting state
const contentReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

// Create a post or comment
const createContent = () => async (contentType, info) => {
    contentType += 's';
    const { text } = info;
    if (!text) throw { message: `${contentType} body is required` };
    await froyoApi.post(`/${contentType}`, info);
};

// Delete a post or comment by id
const deleteContent = () => async (contentType, contentId) => {
    await froyoApi.delete(`/${contentType}s/${contentId}`);
}

// Get content by id
const getContent = () => async (contentType, contentId) => {
    const {
        data: content
    } = await froyoApi.get(`/${contentType}s/${contentId}`);
    return content;
}

// (GET) Search content
const searchContent = () => async (contentType, query) => {
    const { data: content } = await froyoApi.get(`/${contentType}s`, {
        params: query
    });
    return content;
}

// GET all the comments of a given parent
const getComments = () => async (contentType, parentId) => {
    const { data: comments } = await froyoApi.get(`/${contentType}s/${parentId}/comments`);
    return comments;
};

// GET the user's personal feed
const getFeed = () => async () => {
    const { data: posts } = await froyoApi.get(`/feed`);
    return posts;
};

// Like a post or comment (unlikes if already liked)
const likeContent = () => async (contentType, contentId) => {
    const { data: updatedContent } = await froyoApi.put(`/${contentType}s/${contentId}/like`);
    return updatedContent;
};

// Dislike a post or comment (undislikes if already disliked)
const dislikeContent = () => async (contentType, contentId) => {
    const { data: updatedContent } = await froyoApi.put(`/${contentType}s/${contentId}/dislike`);
    return updatedContent;
};

export const { Provider, Context } = createDataContext(
    contentReducer,
    {
        createContent,
        deleteContent,
        getContent,
        searchContent,
        getComments,
        getFeed,
        likeContent,
        dislikeContent
    }, {}
);
