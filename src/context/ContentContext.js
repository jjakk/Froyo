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
    contentType += 's';
    await froyoApi.delete(`/${contentType}/${contentId}`);
}

// Get content by id
const getContent = () => async (contentType, contentId) => {
    contentType += 's';
    const {
        data: content
    } = await froyoApi.get(`/${contentType}/${contentId}`);
    return content;
}

// (GET) Search content
const searchContent = () => async (contentType, query) => {
    contentType += 's';
    const { data: content } = await froyoApi.get(`/${contentType}`, {
        params: query
    });
    return content;
}

// GET all the comments of a given parent
const getComments = () => async (contentType, parentId) => {
    contentType += 's';
    const { data: comments } = await froyoApi.get(`/${contentType}/${parentId}/comments`);
    return comments;
};

// GET the user's personal feed
const getFeed = () => async () => {
    const { data: posts } = await froyoApi.get(`/feed`);
    return posts;
};

// Like a post or comment (unlikes if already liked)
const likeContent = () => async (contentType, contentId) => {
    contentType += 's';
    const { data: updatedContent } = await froyoApi.put(`/${contentType}/${contentId}/like`);
    return updatedContent;
};

// Dislike a post or comment (undislikes if already disliked)
const dislikeContent = () => async (contentType, contentId) => {
    contentType += 's';
    const { data: updatedContent } = await froyoApi.put(`/${contentType}/${contentId}/dislike`);
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
