import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (typeof props.onDrop !== 'undefined') {
      props.onDrop(acceptedFiles[0]);
    }
    setMyFiles([...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive, isFileDialogActive } = useDropzone({onDrop});

  const files = myFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const removeAll = () => {
    if (typeof props.onRemove !== 'undefined') {
      props.onRemove(null)
    }
    setMyFiles([]);
  };


  if (props.hasOwnProperty('galleryImages')
      && parseInt(props.galleryImages) >= parseInt(props.maxNrOfFiles)) {
   return (
       <section className='container sm:w-1/3 border-dashed border-2 border-gray-600 px-2 py-4'>
         <div className='px-4 py-4 cursor-pointer bg-red-100'>
           <p>You reached the number of files allowed!</p>
         </div>
       </section>
   );
  }

  return (
    <section className='container sm:w-1/3 border-dashed border-2 border-gray-600 px-2 py-4'>
      <div {...getRootProps({ className: 'dropzone' })}
           className={`px-4 py-4 cursor-pointer ${ isDragActive || isFileDialogActive ? 'bg-green-100' : ''}
                ${typeof props.onDrop !== 'undefined' ? 'h-full' : ''}
           `}>
        <input {...getInputProps()} />
        <p>Click to select/ Upload new photo</p>
      </div>
      {myFiles.length > 0 && typeof props.onRemove !== 'undefined' && (
        <aside className='flex ml-4'>
          <h4 className={' mr-4'}>New Image:</h4>
          <ul>{files}</ul>
          <button
            onClick={removeAll}
            className='bg-red-500 text-white active:bg-red-600 ml-4 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
          >
            Remove
          </button>
        </aside>
      )}
    </section>
  );
}
