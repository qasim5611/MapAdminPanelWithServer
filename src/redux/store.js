import { createStore, combineReducers, applyMiddleware } from "redux";
import { auth } from "./reducers/authReducer";
import thunk from "redux-thunk";
import { topStoryReducer } from "./reducers/topStoryReducer";
import { ArticleReducer } from "./reducers/ArticleReducer";
import { editorReducer } from "./reducers/EditorReducer";
import { categoryReducer } from "./reducers/CategoryReducer";
import { videoArticleReducer } from "./reducers/videoArticleReducer";
import { bannerReducer } from "./reducers/bannerReducer";
import { headerReducer } from "./reducers/HeaderReducer";
import { footerReducer } from "./reducers/FooterReducer";
import { sidebarReducer } from "./reducers/SideBarReducer";
import {MagzineReducer} from "./reducers/MagzineReducer"
import {TeamMember} from "./reducers/TeamMemberReducer"
import {Talkshows_reducer} from "./reducers/TalkShow_Reducer"
import {aboutReducer} from './reducers/aboutReducer'
import {galleryReducer} from './reducers/GalleryReducer'
let AllReducers = combineReducers({
  auth,
  topStoryReducer,
  ArticleReducer,
  editorReducer,
  categoryReducer,
  videoArticleReducer,
  bannerReducer,
  headerReducer,
  footerReducer,
  MagzineReducer,
  TeamMember,
  sidebarReducer,
  galleryReducer,
  Talkshows_reducer,
  aboutReducer
  
});

let store = createStore(AllReducers, applyMiddleware(thunk));

export default store;
