import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuillResizeImage from 'quill-resize-image'
import { useMemo, useState, useRef, useEffect } from 'react'
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
  const quillRef = useRef(null)
  const [fontStyle, setFontStyle] = useState('Arial')
  const [fontStyleSize, setFontStyleSize] = useState(false)
  const [headerStyle, setHeaderStyle] = useState(false)
  const [colorStyle, setColorStyle] = useState(false)
  const [backgroundStyle, setBackgroundStyle] = useState(false)
  const [boldStyle, setBoldStyle] = useState(false)
  const [italicStyle, setItalicStyle] = useState(false)
  const [underlineStyle, setUnderlineStyle] = useState(false)
  const [listItemStyle, setListItemStyle] = useState(false)

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
    setHeaderStyle(false)
    setColorStyle(false)
    setBackgroundStyle(false)
    setBoldStyle(false)
    setItalicStyle(false)
    setUnderlineStyle(false)
    setListItemStyle(false)
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
      setHeaderStyle(value)
    } catch (e) {}
  }

  const handleColorChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('color', value)
      setColorStyle(value)
    } catch (e) {}
  }

  const handleBackgroundChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('background', value)
      setBackgroundStyle(value)
    } catch (e) {}
  }

  const handleBoldChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('bold', value)
      setBoldStyle(value)
    } catch (e) {}
  }

  const handleItalicChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('italic', value)
      setItalicStyle(value)
    } catch (e) {}
  }

  const handleUnderlineChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('underline', value)
      setUnderlineStyle(value)
    } catch (e) {}
  }

  const handleListItemChange = (value) => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
      editor.format('list', value)
      setListItemStyle(value)
    } catch (e) {}
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
          list: handleListItemChange
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
    } catch (e) {
      console.log('Error handleQuillChange: ', e.message)
    }
  }

  useEffect(() => {
    try {
      if (quillRef.current === null) return
      const editor = quillRef.current.getEditor()
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

      const editorPlaceHolder = document.querySelector(`#${editorSelect} .ql-container.ql-snow .ql-editor.ql-blank`)
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
  return (
    <div className='w-full h-full' onKeyDownCapture={handleBackSpace}>
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
