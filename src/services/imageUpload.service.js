import axios from 'axios'

export const uploadImg = async ev => {
  const UPLOAD_PRESET = 'iuzstnbj'
  const CLOUD_NAME = 'ariecloud'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  try {
    const { data } = await axios.post(UPLOAD_URL, FORM_DATA)
    return data
  } catch (err) {
    console.log('ERROR:', err)
  }
}
