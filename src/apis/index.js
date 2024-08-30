import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// không dùng try catch vì ở phía FE ko nhất thiết phải làm như vậy đối với mọi request bởi gây thừa code nhiều
// catch lỗi tập trung bằng Interceptors trong axios
// Interceptors: dùng để đánh chặn vào giữa request và response để xử lý logic mà mình muốn

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

  // lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data
}