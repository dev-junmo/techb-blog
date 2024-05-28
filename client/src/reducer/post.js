export const initialState = {
  mainPosts: [
  // {
  //   id: 1,
  //   category: "Web",
  //   title: "E-commerce Cart 데모",
  //   subTitle: "Backend Build",
  //   content: "첫 번째 게시글",
  //   user: "사용자",
  //   date: "2022-10-31",
  //   hashtags: ["#e-commerce", "#backend", "#cart"]
  // }, 
  // {
  //   id: 2,
  //   category: "Server",
  //   title: "GraphQL",
  //   subTitle: "GraphQL은 페이스북에 의해 REST API의 문제를 해결하기 위해 만들어졌습니다.",
  //   content: "두 번째 게시글",
  //   user: "사용자",
  //   date: "2022-10-31",
  //   hashtags: ["#server", "#graphql"]
  // },
  // {
  //   id: 3,
  //   category: "Web",
  //   title: "TopRank 앵귤러 분석",
  //   subTitle: "앵귤러에서의 양방향 바인딩 ",
  //   content: "세 번째 게시글",
  //   user: "사용자",
  //   date: "2022-11-02",
  //   hashtags: ["#toprank", "#angular", "#양방향바인딩"]
  // }
  ],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  hasMorePosts: true,
  imagePaths: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  editMode: false,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  eidtCommentLoading: false,
  eidtCommentDone: false,
  eidtCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_POST_STATE_RESET = 'ADD_POST_STATE_RESET';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const REMOVE_POST_RESET = 'REMOVE_POST_RESET';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const EDIT_MODE_ON = 'EDIT_MODE_ON';
export const EDIT_MODE_OFF = 'EDIT_MODE_OFF';
export const EDIT_MODE_RESET = 'EDIT_MODE_RESET';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';
export const REMOVE_COMMENT_RESET = 'REMOVE_COMMENT_RESET';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

// const dummyPost = (data) => ({
//   id: 4,
//   category: "Design",
//   title: data.title,
//   subTitle: data.subTitle,
//   content: data.content,
//   user: {
//     id: 4,
//     nickname: data.user
//   },
//   date: "2022-11-06",
//   hashtags: ["#toprank", "#angular", "#양방향바인딩"]
// });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [action.data, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_POST_STATE_RESET:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: false,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data.PostId),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case REMOVE_POST_RESET:
      return {
        ...state,
        removePostDone: false,
        mainPosts: [],
      };
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostLoading: true,
        loadPostDone: false,
        loadPostError: null,
      };
    case LOAD_POST_SUCCESS:
      // console.log(action.data);
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: true,
        mainPosts: state.mainPosts.concat(action.data),
        hasMorePosts: action.data.length === 10,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        loadPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [action.data, ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        addCommentError: action.error,
      };
    case UPLOAD_IMAGES_REQUEST:
      return {
        ...state,
        uploadImagesLoading: true,
        uploadImagesDone: false,
        uploadImagesError: null,
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesDone: true,
        imagePaths: action.data,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesError: action.error,
      };
    case EDIT_MODE_ON:
      return {
        ...state,
        editMode: true,
      };
    case EDIT_MODE_OFF:
      return {
        ...state,
        editMode: false,
      };
    case EDIT_POST_REQUEST:
      return {
        ...state,
        editPostLoading: true,
        editPostDone: false,
        editPostError: null,
      };
    case EDIT_POST_SUCCESS:
      const editPostIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const mainPostsAll = { ...state.mainPosts };
      mainPostsAll[editPostIndex] = action.data;

      return {
        ...state,
        editPostLoading: false,
        editPostDone: true,
        mainPostsAll,
      };
    case EDIT_POST_FAILURE:
      return {
        ...state,
        editPostLoading: false,
        editPostError: action.error,
      };
    case EDIT_MODE_RESET:
      return {
        ...state,
        editPostDone: false,
      };
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
        removeCommentDone: false,
        removeCommentError: null,
      };
    case REMOVE_COMMENT_SUCCESS:
      const commentPostIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const findPost = { ...state.mainPosts };
      const findPostComment = [ ...state.mainPosts[commentPostIndex].Comments ];
      // const findPostCommentIndex = findPostComment.findIndex((v) => v.id === action.data.id);
      const filterComment = findPostComment.filter((v) => v.id !== action.data.CommentId);
      findPost[commentPostIndex].Comments = filterComment;

      return {
        ...state,
        removeCommentLoading: false,
        removeCommentDone: true,
        findPost,
      };
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentError: action.error,
      };
    case REMOVE_COMMENT_RESET:
      return {
        ...state,
        removeCommentDone: false,
      };
    case EDIT_COMMENT_REQUEST:
      return {
        ...state,
        editCommentLoading: true,
        editCommentDone: false,
        editCommentError: null,
      };
    case EDIT_COMMENT_SUCCESS:
      const eidtCommentPostIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const editFindPost = { ...state.mainPosts };
      const eidtFindPostComment = [ ...state.mainPosts[eidtCommentPostIndex].Comments ];
      const commentIndex = eidtFindPostComment.findIndex((v) => v.id === action.data.CommentId);
      eidtFindPostComment[commentIndex].content = action.data.content;
      editFindPost[eidtCommentPostIndex].Comments = eidtFindPostComment;

      return {
        ...state,
        editCommentLoading: false,
        editCommentDone: true,
        editFindPost
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        editCommentLoading: false,
        editCommentError: action.error,
      };
    default:
      return state;
  }
}

export default reducer;