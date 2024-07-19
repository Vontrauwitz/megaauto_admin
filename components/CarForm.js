// components/CarForm.js

import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { ReactSortable } from 'react-sortablejs';
import imageCompression from 'browser-image-compression';

function CarForm({ initialData, onSubmit }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [odometer, setOdometer] = useState('');
  const [year, setYear] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [price, setPrice] = useState('');
  const [dealership, setDealership] = useState('Mega Autos');
  const [favorite, setFavorite] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setBrand(initialData.brand || '');
      setModel(initialData.model || '');
      setVersion(initialData.version || '');
      setOdometer(initialData.odometer || '');
      setYear(initialData.year || '');
      setVinNumber(initialData.vinNumber || '');
      setPrice(initialData.price || '');
      setDealership(initialData.dealership || 'Mega Autos');
      setFavorite(initialData.favorite || false);
      setExistingPhotos(initialData.photos || []);
    }
  }, [initialData]);

  const onDrop = useCallback((acceptedFiles) => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      ...acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemovePhoto = (photo) => {
    setPhotos(photos.filter(p => p !== photo));
  };

  const handleRemoveExistingPhoto = (url) => {
    setExistingPhotos(existingPhotos.filter(photo => photo !== url));
  };

  const validate = () => {
    const newErrors = {};
    if (!brand) newErrors.brand = 'Brand is required';
    if (!model) newErrors.model = 'Model is required';
    if (!version) newErrors.version = 'Version is required';
    if (!odometer) {
      newErrors.odometer = 'Odometer is required';
    } else if (isNaN(odometer) || odometer < 0) {
      newErrors.odometer = 'Odometer must be a positive number';
    }
    if (!year) {
      newErrors.year = 'Year is required';
    } else if (isNaN(year) || year < 1886 || year > new Date().getFullYear()) {
      newErrors.year = 'Year must be a valid year';
    }
    if (!vinNumber) {
      newErrors.vinNumber = 'VIN Number is required';
    } else if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vinNumber)) {
      newErrors.vinNumber = 'VIN Number must be 17 characters and exclude I, O, and Q';
    }
    if (!price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(price) || price < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!dealership) newErrors.dealership = 'Dealership is required';
    if (photos.length + existingPhotos.length === 0) newErrors.photos = 'At least one photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setUploading(true);

    try {
      // Compress and upload new images to Cloudinary
      const uploadedPhotos = await Promise.all(photos.map(async (photo) => {
        const compressedFile = await imageCompression(photo, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const formData = new FormData();
        formData.append('file', compressedFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        return response.data.secure_url;
      }));

      const carData = { 
        brand, 
        model, 
        version, 
        odometer, 
        year, 
        vinNumber, 
        price,
        dealership,
        favorite,
        photos: [...existingPhotos, ...uploadedPhotos]
      };

      onSubmit(carData);
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="bg-gray-800 p-6 rounded-lg" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="brand">Brand</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="brand"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="model">Model</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="model"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="version">Version</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="version"
          name="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        {errors.version && <p className="text-red-500 text-sm">{errors.version}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="odometer">Odometer</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="number"
          id="odometer"
          name="odometer"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
        />
        {errors.odometer && <p className="text-red-500 text-sm">{errors.odometer}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="year">Year</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="number"
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="vinNumber">VIN Number</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="vinNumber"
          name="vinNumber"
          value={vinNumber}
          onChange={(e) => setVinNumber(e.target.value)}
        />
        {errors.vinNumber && <p className="text-red-500 text-sm">{errors.vinNumber}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="price">Price</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="dealership">Dealership</label>
        <select
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          id="dealership"
          name="dealership"
          value={dealership}
          onChange={(e) => setDealership(e.target.value)}
        >
          <option value="Mega Autos">Mega Autos</option>
          <option value="Externo">Externo</option>
        </select>
        {errors.dealership && <p className="text-red-500 text-sm">{errors.dealership}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="favorite">Favorite</label>
        <input
          type="checkbox"
          id="favorite"
          name="favorite"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="photos">Photos</label>
        <div 
          {...getRootProps()} 
          className={`w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed ${isDragActive ? 'border-blue-500' : 'border-gray-500'} flex justify-center items-center cursor-pointer`}
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
        <div className="mt-4">
          <ReactSortable list={existingPhotos} setList={setExistingPhotos} className="grid grid-cols-3 gap-2">
            {existingPhotos.map((photo, index) => (
              <div key={index} className="relative mb-2">
                <img src={photo} alt={`Existing photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingPhoto(photo)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </ReactSortable>
          <ReactSortable list={photos} setList={setPhotos} className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative mb-2">
                <img src={photo.preview} alt={`New photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(photo)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700" type="submit" disabled={uploading}>
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
      {uploading && <p className="text-center text-white mt-2">Uploading...</p>}
    </form>
  );
}

export default CarForm;
