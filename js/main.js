import {getPosts} from './data.js';
import {renderPictures} from './pictures.js';
import './picture-form.js';
renderPictures(getPosts());
