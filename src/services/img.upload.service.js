import axios from 'axios'

// AXIOS
export const imgUploadService = {
  async uploadImg(imgFile) {
    const UPLOAD_PRESET = 'iuzstnbj';
    const CLOUD_NAME = 'ariecloud';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const FORM_DATA = new FormData()

    FORM_DATA.append('file', imgFile)
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)

    try {
      const res = await axios.post(UPLOAD_URL, FORM_DATA)
      return res.data
    } catch (err) {
      console.error('ERROR!', err)
    }
  },
}
