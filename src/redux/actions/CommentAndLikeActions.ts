import axios from 'axios';
import {BASE_URL} from '../../utils/Config';
import { showToast } from '../../utils/showToast';


// make comment not work. look later.
export const onMakeComment = async (comment: string, post_id: number, user_id: number) => {
    try {
      console.log(typeof(post_id))
      console.log(typeof(user_id))

      const p_id = Number(post_id)
      const u_id = Number(user_id)

      const response =  await axios.post(`${BASE_URL}postcomments/make`, {
        "comment": comment,
        "post_id" : post_id,
        "user_id": user_id
      });

      console.log(response.data)

    } catch (error) {
      showToast("Error : " + error)
    }
};


export const onLikePost = async (post_id: number, user_id: number) => {
    try {
      await axios.post(`${BASE_URL}post/like`, {
        post_id,
        user_id
      });

    } catch (error) {
      showToast("Error : " + error)
    }
};
