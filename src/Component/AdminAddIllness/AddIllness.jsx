import { AdminEditor, BreadCrumbs } from '../'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { useNavigate } from 'react-router-dom'
import { message, Modal, Tooltip, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { AdminDiseaseApi } from '../../Api/admin'
import 'react-quill/dist/quill.snow.css'
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { Hospital } from 'iconsax-react'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
const AddIllness = () => {
  const { setIsLogin } = useAdminMainLayoutFunction()
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
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

  //#region modal
  //Modal setting
  const [openModal, setOpenModal] = useState(false)

  const [submitLoading, setSubmitLoading] = useState(false)

  //Modal data

  const [editorHTML, setEditorHTML] = useState('')
  const [diseaseName, setDiseaseName] = useState('')
  const [errorDiseaseName, setErrorDiseaseName] = useState('')
  const [generalOverview, setGeneralOverview] = useState('')
  const [errorGeneralOverview, setErrorGeneralOverview] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [errorSymptoms, setErrorSymptoms] = useState('')
  const [cause, setCause] = useState('')
  const [errorCause, setErrorCause] = useState('')
  const [riskSubjects, setRiskSubjects] = useState('')
  const [errorRiskSubjects, setErrorRiskSubjects] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [errorDiagnosis, setErrorDiagnosis] = useState('')
  const [prevention, setPrevention] = useState('')
  const [errorPrevention, setErrorPrevention] = useState('')
  const [treatmentMethod, setTreatmentMethod] = useState('')
  const [errorTreatmentMethod, setErrorTreatmentMethod] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorFileUpload, setErrorFileUpload] = useState('')
  const fileInputRef = useRef(null)

  //handle drag and drop image file
  const [dragging, setDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setSelectedFile(droppedFile)
      setThumbnail(URL.createObjectURL(droppedFile))
      fileInputRef.current.value = null
    }
  }

  //handle upload logo
  const handleUploadThumbnail = (e) => {
    const file = e.target.files[0]
    const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
    if (file && validExtensions.includes(file.type)) {
      setThumbnail(URL.createObjectURL(file))
      setSelectedFile(file)
      fileInputRef.current.value = null
    } else {
      setStatus(422)
      setMessageResult(`File ${file.name} is not a valid image file.`)
    }
  }

  //handle clear logo
  const handleClearThumbnail = (e) => {
    e.stopPropagation()
    setThumbnail(null)
    setSelectedFile(null)
  }

  const handleCancelPreview = () => {
    setOpenModal(false)
  }

  const handleErrorName = () => {
    if (diseaseName === '') {
      setErrorDiseaseName('Name is required')
      return false
    }
    return true
  }

  const handleErrorGeneralOverview = () => {
    if (generalOverview === '') {
      setErrorGeneralOverview('General overview is required')
      return false
    }
    return true
  }

  const handleErrorSymptoms = () => {
    if (symptoms === '') {
      setErrorSymptoms('Symptoms is required')
      return false
    }
    return true
  }

  const handleErrorCause = () => {
    if (cause === '') {
      setErrorCause('Cause is required')
      return false
    }
    return true
  }

  const handleErrorRiskSubjects = () => {
    if (riskSubjects === '') {
      setErrorRiskSubjects('Risk subjects is required')
      return false
    }
    return true
  }

  const handleErrorDiagnosis = () => {
    if (diagnosis === '') {
      setErrorDiagnosis('Diagnosis is required')
      return false
    }
    return true
  }

  const handleErrorPrevention = () => {
    if (prevention === '') {
      setErrorPrevention('Prevention is required')
      return false
    }
    return true
  }

  const handleErrorTreatmentMethod = () => {
    if (treatmentMethod === '') {
      setErrorTreatmentMethod('Treatment method is required')
      return false
    }
    return true
  }

  const handleErrorFileError = () => {
    if (!selectedFile) {
      setErrorFileUpload('Thumbnail is required')
      return false
    }
    return true
  }

  const handleValidate = () => {
    const name = handleErrorName()
    const generalOverview = handleErrorGeneralOverview()
    const symptoms = handleErrorSymptoms()
    const cause = handleErrorCause()
    const riskSubjects = handleErrorRiskSubjects()
    const diagnosis = handleErrorDiagnosis()
    const prevention = handleErrorPrevention()
    const treatmentMethod = handleErrorTreatmentMethod()
    const fileError = handleErrorFileError()
    return (
      name &&
      generalOverview &&
      symptoms &&
      cause &&
      riskSubjects &&
      diagnosis &&
      prevention &&
      treatmentMethod &&
      fileError
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (handleValidate()) {
      setSubmitLoading(true)
      const formData = new FormData()
      formData.append('disease_name', diseaseName)
      formData.append('general_overview', generalOverview)
      formData.append('symptoms', symptoms)
      formData.append('cause', cause)
      formData.append('risk_subjects', riskSubjects)
      formData.append('diagnosis', diagnosis)
      formData.append('prevention', prevention)
      formData.append('treatment_method', treatmentMethod)
      if (selectedFile) {
        formData.append('disease_thumbnail', selectedFile)
      }
      try {
        const response = await AdminDiseaseApi.addDisease(formData, token)
        if (!response) {
          return
        }
        toast.success('Add disease successfully', {
          autoClose: 3000
        })
        window.history.back()
      } catch (error) {
        if (error.message.includes('401')) {
          setIsLogin(false)
          return
        }
        setStatus(400)
        setMessageResult(error.message)
      } finally {
        setSubmitLoading(false)
      }
    } else {
      setStatus(400)
      setMessageResult('Invalid data. Please check your input again')
    }
  }

  const cancelAdd = () => {
    navigate(-1)
  }

  useEffect(() => {
    const wrappedGeneralOverview = `<div class="flex flex-col"> ${generalOverview} </div>`
    const wrappedSymptoms = `<div class="section"> ${symptoms} </div>`
    const wrappedCause = `<div class="section"> ${cause} </div>`
    const wrappedRiskSubjects = `<div class="section"> ${riskSubjects} </div>`
    const wrappedDiagnosis = `<div class="section"> ${diagnosis} </div>`
    const wrappedPrevention = `<div class="section"> ${prevention} </div>`
    const wrappedTreatmentMethod = `<div class="section"> ${treatmentMethod} </div>`

    const combinedHtml = `
      ${wrappedGeneralOverview}
      ${wrappedSymptoms}
      ${wrappedCause}
      ${wrappedRiskSubjects}
      ${wrappedDiagnosis}
      ${wrappedPrevention}
      ${wrappedTreatmentMethod}
    `

    setEditorHTML(combinedHtml)
  }, [generalOverview, symptoms, cause, riskSubjects, diagnosis, prevention, treatmentMethod])

  //#endregion

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
  const { scrollToTop } = useAdminMainLayoutFunction()
  useEffect(() => {
    scrollToTop()
  }, [])

  const [editorSelect, setEditorSelect] = useState()
  const [editorFocus, setEditorFocus] = useState(false)
  return (
    <section className='w-full test'>
      {contextHolder}
      <header className='animate-slideDown flex justify-between items-start w-full sticky top-0 z-10 bg-[#f7f8fa]'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs
            items={[
              { title: `Diseases` },
              {
                title: (
                  <Link to='/admin/disease' tabIndex={-1}>
                    List of disease
                  </Link>
                )
              },
              {
                title: `Add disease`
              }
            ]}
          />
          <p>
            Add new disease, those field with <span className='text-red-500'>*</span> are required.
          </p>
        </div>
        <button
          type='button'
          className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'
          onClick={() => setOpenModal(true)}
        >
          Preview Disease
        </button>
      </header>
      <Modal title='' centered open={openModal} width={'100vw'} footer={false} closeIcon={null}>
        <div className='w-full flex flex-col gap-3'>
          <h1 className='text-black text-2xl font-semibold mx-auto'>Preview Disease</h1>
          <div
            className='ql-editor flex flex-col gap-4 w-full'
            dangerouslySetInnerHTML={{
              __html: editorHTML
            }}
          ></div>
          <button
            type='button'
            onClick={handleCancelPreview}
            className='p-2 w-16 h-16 rounded-[50%] bg-[#66b5a2] sticky bottom-8 animate-bounce ml-auto'
          >
            <CloseOutlined className='text-white text-2xl' />
          </button>
        </div>
      </Modal>
      <div className='my-8 relative w-full animate-slideUp'>
        <Spin spinning={submitLoading} tip='Loading...' size='large' fullscreen />
        <form action='' method='POST' onSubmit={handleSubmit} autoComplete='off' className='w-full'>
          <div className='w-full flex gap-8'>
            <div className='w-full p-8 bg-[#fff] rounded-xl border border-solid border-[#e6eaed]'>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='disease_thumbnail'>Thumbnail</label>
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                  name='disease_thumbnail'
                  id='disease_thumbnail'
                  className='hidden'
                  placeholder='Choose file'
                  onChange={handleUploadThumbnail}
                  ref={fileInputRef}
                  onClick={() => setErrorFileUpload('')}
                />
                <Tooltip
                  title={errorFileUpload}
                  open={errorFileUpload !== ''}
                  placement='top'
                  align={{
                    offset: [0, 100]
                  }}
                >
                  <div
                    className='w-full h-full flex justify-center items-center gap-4 mt-[4px]'
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <button
                      type='button'
                      onClick={() => document.getElementById('disease_thumbnail').click()}
                      className='w-full h-full flex justify-center items-start relative focus:outline-none  rounded-md'
                      style={{
                        border: thumbnail ? 'none' : '1px dashed #9D9D9D'
                      }}
                    >
                      {thumbnail ? (
                        <>
                          <img src={thumbnail} alt='thumbnail' className='w-52 h-52 rounded-[50%] object-cover' />
                          <CloseCircleOutlined
                            className='absolute top-0 right-0 text-red-500 text-xl cursor-pointer'
                            onClick={handleClearThumbnail}
                          />
                        </>
                      ) : (
                        <div className='w-full flex flex-col gap-4 justify-center items-center min-h-52'>
                          <div className='w-full flex gap-2 justify-center items-center'>
                            <div className='w-20 h-20 rounded-[50%] flex justify-center items-center'>
                              <Hospital className='text-[777777] w-full h-14' />
                            </div>
                            <div className='flex flex-col gap-2 items-center justify-center text-sm text-teal-700'>
                              <span>Drag image here</span>
                              <span className='font-semibold'>Or</span>
                              <span>Browse image</span>
                            </div>
                          </div>
                          <span className='text-red-600 italic text-sm'>
                            (only *.jpeg, *.jpg, *.png, *.gif and *.svg)
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='disease_name'>
                  <span className='text-[red]'>* </span>Name
                </label>
                <Tooltip
                  title={errorDiseaseName}
                  open={errorDiseaseName !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <input
                    type='text'
                    name='disease_name'
                    id='disease_name'
                    className='mt-1 h-[50px] rounded bg-transparent px-[15px] py-[10px] w-full border-[rgb(188,190,193)] border-solid border focus:border-[#1d242e] min-w-56 outline-none'
                    placeholder='Cúm'
                    value={diseaseName}
                    onChange={(e) => setDiseaseName(e.target.value)}
                    onFocus={() => setErrorDiseaseName('')}
                  />
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='general_overview'>
                  <span className='text-[red]'>* </span>General overview
                </label>
                <Tooltip
                  title={errorGeneralOverview}
                  open={errorGeneralOverview !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='general_overview'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('general_overview')
                      setErrorGeneralOverview('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      defaultValue={generalOverview}
                      idEditor='general_overview'
                      onChange={setGeneralOverview}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='symptoms'>
                  <span className='text-[red]'>* </span>Symptoms
                </label>
                <Tooltip
                  title={errorSymptoms}
                  open={errorSymptoms !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='symptoms'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('symptoms')
                      setErrorSymptoms('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      idEditor='symptoms'
                      onChange={setSymptoms}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>

              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='cause'>
                  <span className='text-[red]'>* </span> Cause
                </label>
                <Tooltip
                  title={errorCause}
                  open={errorCause !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='cause'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('cause')
                      setErrorCause('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      idEditor='cause'
                      onChange={setCause}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='risk_subjects'>
                  <span className='text-[red]'>* </span>Risk subjects
                </label>
                <Tooltip
                  title={errorRiskSubjects}
                  open={errorRiskSubjects !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='risk_subjects'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('risk_subjects')
                      setErrorRiskSubjects('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      idEditor='risk_subjects'
                      onChange={setRiskSubjects}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='diagnosis'>
                  <span className='text-[red]'>* </span>Diagnosis
                </label>
                <Tooltip
                  title={errorDiagnosis}
                  open={errorDiagnosis !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='diagnosis'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('diagnosis')
                      setErrorDiagnosis('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      idEditor='diagnosis'
                      onChange={setDiagnosis}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='prevention'>
                  <span className='text-[red]'>* </span>Prevention
                </label>
                <Tooltip
                  title={errorPrevention}
                  open={errorPrevention !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='prevention'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('prevention')
                      setErrorPrevention('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      idEditor='prevention'
                      onChange={setPrevention}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className='pb-[1.563rem] w-full flex flex-col gap-[4px]'>
                <label htmlFor='treatment_method'>
                  <span className='text-[red]'>* </span>Treatment method
                </label>
                <Tooltip
                  title={errorTreatmentMethod}
                  open={errorTreatmentMethod !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <div
                    className='h-[400px] w-full'
                    id='treatment_method'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('treatment_method')
                      setErrorTreatmentMethod('')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      idEditor='treatment_method'
                      onChange={setTreatmentMethod}
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </Tooltip>
              </div>

              <div className='w-full'>
                <div className='AddCategoryForm__groupButton'>
                  <button type='submit' className='AddCategoryForm__submitBtn'>
                    Save
                  </button>
                  <button type='button' className='AddCategoryForm__cancelBtn' onClick={cancelAdd}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddIllness
