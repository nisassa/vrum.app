import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListingCard from '../components/ListingsCard';
import Toast2 from '../components/Toast2';
import Loading from '../components/Loading';
import SearchForm from './Provider/partials/actions/SearchForm';
import settings from '../config/settings';
import {
  useGetProviders,
  useGetAllCategoriesServices,
  useGetAllCities
} from '../hooks/useBookings';
import BookingRequestModal from './Client/Booking/BookingRequestModal';

function IndexPage() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastData] = useState([{ type: '', msg: '' }]);
  const [bookingRequest, setBookingRequest] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [servicesList, setservicesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { page } = useParams();

  const [pageNumb, setPageNumb] = useState(page ? page : 1);
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState('');
  const { data: cities } = useGetAllCities();
  const { data: categories } = useGetAllCategoriesServices();
  const {
    data: providers,
    isLoading,
    refetch
  } = useGetProviders(searchTerm, pageNumb, city, serviceType);

  const handleChange = (event) => {
    const categoryId = parseInt(event.target.value, 10);
    setSelectedCategory(categoryId ? categoryId : 'all');
    console.log(`Selected item with id: ${categoryId}`);
    const category = categoryId
      ? categories.filter((category) => category.id === categoryId)[0]
      : [];
    const service = category
      ? category.services.map((service) => ({
          id: service.id,
          name: service.name
        }))
      : [];
    setservicesList(service);
  };
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  useEffect(() => {
    refetch();
  }, [searchTerm, pageNumb, city, serviceType, refetch]);

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
                <SearchForm
                  inputValue={searchTerm}
                  setInputValue={setSearchTerm}
                  setCity={setCity}
                  setServiceType={setServiceType}
                />
              </div>
              <div className='country flex-auto mx-2'>
                <select
                  id='country'
                  className='form-select'
                  onChange={(event) => setCity(event.target.value)}
                >
                  <option value=''>All cities</option>

                  {cities !== undefined &&
                    cities.map((city) => {
                      return <option key={city.id}>{city.city}</option>;
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
                    categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='services flex-auto mx-2'>
                {selectedCategory && selectedCategory !== 'all' && (
                  <select
                    id='services'
                    className='form-select'
                    onChange={(event) => setServiceType(event.target.value)}
                  >
                    <option value=''>Select a Service</option>
                    {servicesList.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
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
                      <>
                        <ListingCard
                          key={provider.id}
                          id={provider.id}
                          type={provider.type}
                          name={provider.name}
                          image={imgPath}
                          city={provider.city}
                          bookingRequest={bookingRequest}
                          setBookingRequest={setBookingRequest}
                          handleClick={handleClick}
                        />
                      </>
                    );
                  })}
              </div>
              <div className='w-full text-center'>
                {pageNumb && pageNumb !== 1 && (
                  <button class='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap px-10 mx-auto'>
                    Load more
                  </button>
                )}
              </div>
            </div>
            <div className='md:w-1/2 p-4 map'>
              {' '}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingRequest(true);
                }}
                className='btn text-white'
              >
                Book
              </button>
            </div>
          </div>
        </div>
        <BookingRequestModal
          bookingRequest={bookingRequest}
          setBookingRequest={setBookingRequest}
          toastOpen={toastOpen}
          setToastOpen={setToastOpen}
          toastType={toastType}
          setToastData={setToastData}
        />
      </div>
    </>
  );
}
export default IndexPage;
