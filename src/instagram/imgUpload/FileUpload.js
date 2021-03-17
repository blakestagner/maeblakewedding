import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import './imgUpload.css';

import AvatarIcon from '../../img/icons/profile_white.svg';
import CloseIcon from '../../img/icons/close.svg';
import ArrowDown from '../../img/icons/arrow_down.svg';


const FileUpload = forwardRef((props, ref) => {
    const [loading, doneLoading ] = useState(1);
    const [show, hide] = useState(0);
    const [userMessage, setMessage] = useState();
    const [preview, setPreview] = useState(0)
    const [newImage, setImage] = useState(0);
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        doneLoading(0)        
    }, [newImage])

    useImperativeHandle(ref, () => ({
        toggleImageUpload() {
            toggle()
        }
      }));

    const toggle = () => {
        if(show === 0) {
            hide(1)
        } else {
            hide(0)
        }
    }    

    const onChangeHandler = (evt) => {
        console.log(evt.target.files[0])
        setImage(evt.target.files[0])
        setPreview(URL.createObjectURL(evt.target.files[0]))
    }

    const onClickHandler = () => {
        const data = new FormData()
        data.append('image', newImage)
        setMessage('Uploading Image...')
        uploadUserImage(data)
        .then(res => { // then print response status
            setProgress(100)
            setMessage('Image Uploaded!')
            setTimeout(() => {
                props.update()
                setProgress(0)
                setMessage('')
                setImage(0)
                setPreview(0)
                hide(0)
                hide(0)}, 2000)
            })
        .catch(err => console.log(err))
    }

    const RemoveImage = () => {
        setImage(0)
        setPreview(0)
        console.log(newImage)
    }

    const options = {
        onUploadProgress: ProgressEvent => {
            const {loaded, total} = ProgressEvent
            let percent = Math.floor((loaded *100 / total) / 2)
            setProgress(percent)
            console.log(`${percent}%`)
        }
    }

    const uploadUserImage = (data) => {
        return axios.post(`https://api.blakestagner.com/api/upload-user-img`, data, options)
        .then(res => res)
        .catch(err => err.data)
    }

    useEffect(()=> {
        if(progress === 50) {
            setMessage('Uploading to the Cloud...')
        }
    }, [progress])

    if(loading) {
        return (
            <div>
                <p>loading</p>
            </div>
        )
    }

    return (
        <div 
            className={show === 0 ? 
                'image-upload-body disabled' : 
                'image-upload-body active'}>
            <div style={{padding: '10px', height: 'calc(100% - 20px)', width: 'calc(100% - 20px)'}}>
                <div className="image-upload-title">
                    <h1>New Post</h1>
                    <div
                        onClick={() => toggle()} 
                        className="close-image-upload">
                        <img alt="close" src={ArrowDown} />
                    </div>
                </div>
                <div 
                    style={{height: 'auto'}}>
                    <div 
                        onClick={() => RemoveImage()}
                        className="preview-image-container">
                        <img 
                            alt="preview img"
                            className="preview-image" 
                            src={preview !== 0 ? preview : AvatarIcon}/>
                            {progress !== 0 ?
                                <div className="progress">
                                    <p>{Math.round(progress)}%</p>
                                    <progress 
                                        id="file" 
                                        value={progress} 
                                        max="100">
                                    </progress>
                                    <p style={{color: '#fff'}} id="image-message">{userMessage}</p>
                                </div> : ''
                            }
                        {preview === 0 ? '' :
                            <p className="remove-image">
                            <img
                                alt="close"
                                src={CloseIcon} />
                            </p> 
                        }
                    </div>
                </div>
                <div>
                    {newImage === 0 ? 
                    <div className="file-input-row">
                        <input
                            className="inputfile"
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            name="file"
                            onChange={onChangeHandler}
                        />
                        <label htmlFor="contained-button-file">Choose a file</label>
                    </div> 
                :
                        <div className="file-input-row">
                            <button 
                                className="upload-button"
                                type="file"
                                onClick={() => onClickHandler()}>
                                Upload
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})
export default FileUpload;
