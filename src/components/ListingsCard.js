import { Link } from 'react-router-dom';

function ListingCard(props) {
  console.log(props.handleClick);
  return (
    <Link
      className='col-span-full sm:col-span-6 xl:col-span-6 shadow-lg rounded-lg border border-slate-200 relative mb-4 overflow-hidden'
      style={{
        height: '250px'
      }}
      to={{}}
    >
      <div className='flex flex-col h-full'>
        {/* Card top */}
        <div className='grow  rounded-lg '>
          <img
            src={props.image}
            className=' rounded-lg h-full'
            alt='provider_image'
          />
          <div className='absolute mt-2 text-sm font-bold text-sm top-0 left-0 px-2'>
            <div className='bg-yellow-400  rounded-md px-1 type'>
              {props.type}
            </div>
          </div>
          <div className='absolute bottom-0 my-5 px-5'>
            <h3 className='provider-name mt-auto text-white font-bold text-xl'>
              {props.name}
            </h3>
            <div className='location text-white'> {props.city}</div>
          </div>
          <div className='absolute mt-2 text-sm font-bold text-sm bottom-0 right-0 mb-4 px-2'>
            <div className='bg-indigo-400  rounded-md px-1 type'>
              <button
                onClick={(e) => {
                  props.handleClick(e);
                  props.setBookingRequest(true);
                }}
                className='btn bg-indigo-400 text-white'
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
