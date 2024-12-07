import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuillResizeImage from 'quill-resize-image'
import { useMemo, useState, useRef, useEffect } from 'react'
import { AdminDiseaseApi } from '../../Api/admin'
import { message, Spin } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { useNavigate } from 'react-router-dom'
Quill.register('modules/resize', QuillResizeImage)

const Font = Quill.import('formats/font')
Font.whitelist = ['Arial', 'Montserrat']
Quill.register(Font, true)

const BlockQuote = Quill.import('formats/blockquote')
class CustomBlockQuote extends BlockQuote {
  static blotName = 'blockquote'
  static tagName = 'blockquote'
  static create(value) {
    const node = super.create(value)
    const classAdd = 'custom-blockquote'
    node.classList.add(classAdd)
    return node
  }
}
Quill.register(CustomBlockQuote, true)

const ListItem = Quill.import('formats/list')
class CustomListItem extends ListItem {
  static create(value) {
    const node = super.create(value)
    const classAdd = 'custom-list-item'
    node.classList.add(classAdd)
    return node
  }
}
Quill.register(CustomListItem, true)
const Icon = Quill.import('ui/icons')
Icon['clean'] =
  '<span class="ql-clean"><svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.7 3.3l-1.4-1.4-5.3 5.3-5.3-5.3-1.4 1.4 5.3 5.3-5.3 5.3 1.4 1.4 5.3-5.3 5.3 5.3 1.4-1.4-5.3-5.3z"></path></svg></span>'

//custom text editor
const toolBarOptions = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }, { font: Font.whitelist }, { size: ['small', false, 'large', 'huge'] }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['bold', 'italic', 'underline'],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  ['link', 'image'],
  ['blockquote'],
  ['clean']
]

const formats = [
  'header',
  'align',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'link',
  'image',
  'font',
  'size',
  'color',
  'background',
  'indent',
  'blockquote'
]

const Editor = ({
  idEditor,
  onChange,
  editorSelect,
  editorFocus,
  placeHolder = 'Write something interesting...',
  defaultValue = ''
}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
  const { logout } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

  const quillRef = useRef(null)
  const [fontStyle, setFontStyle] = useState('Arial')
  const [fontStyleSize, setFontStyleSize] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  // const [headerStyle, setHeaderStyle] = useState(false)
  // const [colorStyle, setColorStyle] = useState(false)
  // const [backgroundStyle, setBackgroundStyle] = useState(false)
  // const [boldStyle, setBoldStyle] = useState(false)
  // const [italicStyle, setItalicStyle] = useState(false)
  // const [underlineStyle, setUnderlineStyle] = useState(false)
  // const [listItemStyle, setListItemStyle] = useState(false)

  const [editorHtml, setEditorHtml] = useState(defaultValue)

  const clearFormat = () => {
    if (quillRef.current === null) return
    const editor = quillRef.current.getEditor()
    editor.format('font', 'Arial')
    editor.format('size', false)
    editor.format('header', false)
    editor.format('color', false)
    editor.format('background', false)
    editor.format('bold', false)
    editor.format('italic', false)
    editor.format('underline', false)
    editor.format('list', false)
    editor.format('align', false)
    editor.format('blockquote', false)
    setFontStyle('Arial')
    setFontStyleSize(false)
  }

  const handleFontChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('font', value)
      setFontStyle(value)
    } catch (e) {}
  }

  const handleSizeChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('size', value)
      setFontStyleSize(value)
    } catch (e) {}
  }

  const handleHeaderChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('header', value)
    } catch (e) {}
  }

  const handleColorChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('color', value)
    } catch (e) {}
  }

  const handleBackgroundChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('background', value)
    } catch (e) {}
  }

  const handleBoldChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('bold', value)
    } catch (e) {}
  }

  const handleItalicChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('italic', value)
    } catch (e) {}
  }

  const handleUnderlineChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('underline', value)
    } catch (e) {}
  }

  const handleListItemChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('list', value)
    } catch (e) {}
  }
  const handleResponse = async (response, defaultErrorText = 'Error fetch', isHandle401 = true) => {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (response.status === 401) {
          if (isHandle401) handleUnauthorized()
        } else {
          let messages
          const status = res.status
          if (!res.messages) {
            if (!response.message) {
              if (!res.data) {
                if (status) messages = status
                else messages = defaultErrorText
              } else messages = res.data.join('. ')
            } else {
              messages = response.message
            }
          } else messages = res.messages.join('. ')
          setStatus(status)
          setMessageResult(messages)
        }
      } else {
        setStatus(response.status)
        setMessageResult(response.statusText ? response.statusText : defaultErrorText)
      }
      return false
    }
    return true
  }

  const handleInsertImage = async () => {
    const fileInput = document.createElement('input')
    fileInput.style.display = 'none'
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', '.jpg,.jpeg,.png,.gif,.svg')

    // Thêm sự kiện onchange
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0]
      const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']

      if (!file || !validExtensions.includes(file.type)) {
        setStatus(400)
        setMessageResult('No file chosen or invalid file type')
        // Xóa input sau khi xử lý
        fileInput.remove()
        return
      }

      const formData = new FormData()
      formData.append('image', file)

      try {
        setSubmitLoading(true)
        const response = await AdminDiseaseApi.uploadDiseaseImage(formData, token)
        const isResponseOK = await handleResponse(response, 'Error uploading image')
        if (isResponseOK) {
          const res = await response.json()
          const dataURL = res.data.url
          const editor = quillRef.current.getEditor()
          const range = editor.getSelection()

          if (range) {
            editor.insertEmbed(range.index, 'image', dataURL)
            editor.setSelection(range.index + 1)
          } else {
            editor.insertEmbed(0, 'image', dataURL)
            editor.setSelection(range.index + 1)
          }
        }
      } catch (error) {
      } finally {
        // Xóa input sau khi hoàn thành
        fileInput.remove()
        setSubmitLoading(false)
      }
    })

    // Kích hoạt hộp thoại chọn file
    fileInput.click()
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolBarOptions,
        handlers: {
          font: handleFontChange,
          size: handleSizeChange,
          header: handleHeaderChange,
          color: handleColorChange,
          background: handleBackgroundChange,
          bold: handleBoldChange,
          italic: handleItalicChange,
          underline: handleUnderlineChange,
          clean: clearFormat,
          list: handleListItemChange,
          image: handleInsertImage
        }
      },
      resize: {
        locale: {}
      },
      clipboard: { matchVisual: false }
    }),
    []
  )

  const handleQuillChange = (content, delta, source, editor) => {
    try {
      setEditorHtml(content)
      if (onChange) onChange(content)
    } catch (e) {}
  }

  useEffect(() => {
    try {
      if (quillRef.current === null) return
      const liItems = document.querySelectorAll(`.text-editor__${idEditor} .ql-editor li`)
      const newestLiItem = liItems.length > 0 ? liItems[liItems.length - 1] : null
      const customLiItemSelector = `.text-editor__${idEditor} .ql-editor .custom-list-item`
      const customLiItems = document.querySelectorAll(customLiItemSelector)

      let fontSize, fontFamily
      switch (fontStyleSize) {
        case 'small':
          fontSize = '0.75rem'
          break
        case 'large':
          fontSize = '1.25rem'
          break
        case 'huge':
          fontSize = '1.5rem'
          break
        default:
          fontSize = '1rem'
          break
      }
      switch (fontStyle) {
        case 'Arial':
          fontFamily = 'Arial'
          break
        case 'Montserrat':
          fontFamily = 'Montserrat'
          break
        default:
          fontFamily = 'Arial'
          break
      }

      if (newestLiItem) {
        newestLiItem.style.setProperty('--font-size', fontSize || 'initial')
        newestLiItem.style.setProperty('--font-family', fontFamily || 'initial')
      }

      if (customLiItems) {
        customLiItems.forEach((item) => {
          item.style.setProperty('--font-size', fontSize || 'initial')
          item.style.setProperty('--font-family', fontFamily || 'initial')
        })
      }

      const editorPlaceHolder = document.querySelector(`#${idEditor} .ql-container.ql-snow .ql-editor.ql-blank`)
      if (editorPlaceHolder) {
        editorPlaceHolder.style.setProperty('font-size', fontSize || 'initial')
        editorPlaceHolder.style.setProperty('font-family', fontFamily || 'initial')
      }
    } catch (e) {
      console.log('Error edit format style: ', e)
    }
  }, [editorHtml, fontStyle, fontStyleSize])

  const clearListStyles = () => {
    const liItems = document.querySelectorAll('.ql-editor li')
    liItems.forEach((item) => {
      item.style.setProperty('--font-size', 'initial')
      item.style.setProperty('--font-family', 'initial')
      item.style.setProperty('--color', 'initial')
      item.style.setProperty('--background-color', 'initial')
      item.style.setProperty('--font-weight', 'initial')
      item.style.setProperty('--font-style', 'initial')
      item.style.setProperty('--text-decoration', 'initial')
    })
  }

  const handleBackSpace = (e) => {
    if (e.code === 'Backspace') {
      try {
        if (quillRef.current === null) return
        const editor = quillRef.current.getEditor()
        const text = editor.getText()

        // Kiểm tra editor có rỗng không
        if (text === '\n') {
          clearListStyles()
          clearFormat()
        }

        // lấy vị trí con trỏ
        const selection = editor.getSelection()

        // Kiểm tra con trỏ có chọn text hay không
        if (selection && selection.length === 0) {
          // Lấy dòng và vị trí cách đầu dòng của con trỏ
          const [line, offset] = editor.getLine(selection.index)

          // Kiểm tra con trỏ có ở đầu dòng không
          if (offset === 0) {
            //Nếu đầu dòng thì xóa ở vị trí trước con trỏ 1 ký tự
            editor.deleteText(selection.index - 1, 1)
          }
        }
      } catch (e) {
        console.log('Backspace error: ', e)
      }
    }
  }

  // Đặt lại border của editor và border bottom của toolbar khi focus và blur
  useEffect(() => {
    if (editorSelect) {
      const toolbar = document.querySelector(`#${editorSelect} .ql-toolbar.ql-snow`)
      const textEditor = document.querySelector(`.text-editor__${editorSelect}`)
      if (toolbar && textEditor) {
        toolbar.style.setProperty('border-bottom', editorFocus ? '1px solid #1d242e' : '1px solid #bcbec1')
        textEditor.style.setProperty('border', editorFocus ? '1px solid #1d242e' : '1px solid #bcbec1 ')
      }
    } else {
      const toolbars = document.querySelectorAll(`.ql-toolbar.ql-snow`)
      const textEditors = document.querySelectorAll(`.text-editor`)
      if (toolbars && textEditors) {
        toolbars.forEach((toolbar) => toolbar.style.setProperty('border-bottom', '1px solid #bcbec1'))
        textEditors.forEach((textEditor) => textEditor.style.setProperty('border', '1px solid #bcbec1'))
      }
    }
  }, [editorSelect])

  useEffect(() => {
    setEditorHtml(defaultValue)
  }, [defaultValue])

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      openMessage('success', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <div className='w-full h-full relative' onKeyDownCapture={handleBackSpace}>
      {contextHolder}
      <Spin
        spinning={submitLoading}
        tip='Loading...'
        size='large'
        percent={'auto'}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={editorHtml}
        onChange={handleQuillChange}
        modules={modules}
        formats={formats}
        placeholder={placeHolder}
        className={`
            h-full w-full bg-[#fff] border border-solid border-[#bcbec1] rounded-md flex flex-col text-editor text-editor__${idEditor}`}
      />
    </div>
  )
}

export default Editor
