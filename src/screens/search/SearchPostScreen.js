import React from 'react';
// Components
import PostList from '../../components/content/PostList';

const SearchPostScreen = (props) => {
    const {
        //onSearch
    } = props;

    return (
        <PostList
            type='Search'
            emptyMessage='No posts found'
            refreshable={false}
            //onDelete={onSearch}
            //ref={postListRef}
        />
    );
};

export default SearchPostScreen;