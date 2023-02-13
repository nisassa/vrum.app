import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ListingCard from '../components/ListingsCard';
import Toast2 from '../components/Toast2';
import Loading from '../components/Loading';
import settings from '../config/settings';
import {
  useGetProviders,
  useGetAllCategoriesServices,
  useGetAllCities
} from '../hooks/useBookings';

function IndexPage() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [servicesList, setservicesList] = useState(['Diagnostic', 'Service 2']);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { page } = useParams();

  const [pageNumb, setPageNumb] = useState(page ? page : '1');
  const { data: cities } = useGetAllCities();
  const { data: categories } = useGetAllCategoriesServices();
  const {
    data: providers,
    isLoading,
    refetch
  } = useGetProviders(searchTerm, pageNumb);

  const handleChange = (event) => {
    const categoryId = parseInt(event.target.value, 10);
    setSelectedCategory(categoryId ? categoryId : 'all');
    console.log(`Selected item with id: ${categoryId}`);
    const category = categoryId
      ? categories.filter((category) => category.id === categoryId)[0]
      : [];
    const service = category
      ? category.services.map((service) => service.name)
      : [];
    setservicesList(service);
  };

  useEffect(() => {
    setSearchTerm(inputValue);

    refetch();
  }, [inputValue, pageNumb, refetch]);

  useEffect(() => {
    const hideToast = setTimeout(() => {
      setToastOpen(false);
    }, 8000);
    console.log(servicesList);
  }, [toastOpen, servicesList]);

  return (
    <>
      <div className='md:container md:mx-auto  my-4 px-4'>
        <div className='bg-yellow-400 p-4 mb-4'>
          <h1 className='w-full text-center text-white'>Guest Home</h1>
        </div>
        <div className='data-wrapper w-full'>
          <div className='filters flex'>
            <form className='flex '>
              <div className='search flex-auto mx-2'>
                <div className='relative'>
                  <input
                    id='form-search'
                    className='form-input w-full pl-9'
                    type='search'
                  />
                  <button
                    className='absolute inset-0 right-auto group'
                    type='submit'
                    aria-label='Search'
                  >
                    <svg
                      className='w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2'
                      viewBox='0 0 16 16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z' />
                      <path d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='country flex-auto mx-2'>
                <select id='country' className='form-select'>
                  <option>All cities</option>

                  {cities !== undefined &&
                    cities.map((data) => {
                      return <option key={data.id}>{data.city}</option>;
                    })}
                </select>
              </div>
              <div className='categories flex-auto mx-2'>
                <select
                  id='categories'
                  className='form-select'
                  onChange={handleChange}
                >
                  <option value='all'>All categories</option>
                  {categories !== undefined &&
                    categories.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='services flex-auto mx-2'>
                {selectedCategory && selectedCategory !== 'all' && (
                  <select id='services' className='form-select'>
                    <option value=''>Select a Service</option>
                    {servicesList.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </form>
          </div>
          <div className='listings flex flex-wrap'>
            <div className='md:w-1/2 p-4 cards'>
              <div
                className={
                  providers === undefined
                    ? 'flex justify-center h-100'
                    : 'grid grid-cols-12 gap-6'
                }
              >
                {providers === undefined ? <Loading /> : ''}

                {providers !== undefined &&
                  providers.data.map((provider) => {
                    const imgPath = provider.photo_gallery.map((gallery) => {
                      return gallery.photo !== null
                        ? `${settings.storageUrl}${gallery.photo}`
                        : 'Placeholder';
                    });

                    return (
                      <ListingCard
                        key={provider.id}
                        id={provider.id}
                        type={provider.type}
                        name={provider.name}
                        image={imgPath}
                        city={provider.city}
                      />
                    );
                  })}
              </div>
            </div>
            <div className='md:w-1/2 p-4 map'>maps</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default IndexPage;
